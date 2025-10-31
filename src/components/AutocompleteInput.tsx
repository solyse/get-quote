import { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService, PlacePrediction } from '../services/api';
import { BcClubIcon } from './BcClubIcon';

export interface Location {
  id: string;
  name: string;
  address: string;
  type: 'club' | 'resort' | 'airport' | 'city' | 'establishment' | 'sports_club' | 'other';
  placeId?: string;
  source?: string;
}

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (location: Location) => void;
  placeholder: string;
  selectedLocation: Location | null;
  excludeLocationId?: string | null; // ID of location to exclude from results (e.g., the other field's selection)
}

// Helper to map API response to Location interface
const mapPlaceToLocation = (placePrediction: PlacePrediction): Location => {
  const mainText = placePrediction.structuredFormat.mainText.text;
  const secondaryText = placePrediction.structuredFormat.secondaryText.text;
  
  // Determine type based on source and types
  let locationType: Location['type'] = 'other';
  if (placePrediction.source === 'bc_club' || placePrediction.types.includes('bc_club') || placePrediction.types.includes('golf_course')) {
    locationType = 'club';
  } else if (placePrediction.types.includes('lodging') || placePrediction.types.includes('resort')) {
    locationType = 'resort';
  } else if (placePrediction.types.includes('sports_club') || placePrediction.types.includes('gym')) {
    locationType = 'sports_club';
  }

  return {
    id: placePrediction.placeId,
    name: mainText,
    address: secondaryText || placePrediction.text.text,
    type: locationType,
    placeId: placePrediction.placeId,
    source: placePrediction.source,
  };
};

export function AutocompleteInput({
  value,
  onChange,
  onSelect,
  placeholder,
  selectedLocation,
  excludeLocationId,
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced API call
  const fetchLocations = useCallback(async (query: string) => {
    if (!query || query.trim().length === 0) {
      setLocations([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiService.getPlacesAutocomplete(query);
      const mappedLocations = response.data.map(item => mapPlaceToLocation(item.placePrediction));
      // Filter out excluded location if provided
      const filteredLocations = excludeLocationId
        ? mappedLocations.filter(location => location.id !== excludeLocationId)
        : mappedLocations;
      setLocations(filteredLocations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  }, [excludeLocationId]);

  // Debounce input changes
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      if (value.trim().length >= 2) {
        fetchLocations(value);
      } else {
        setLocations([]);
      }
    }, 300); // 300ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value, fetchLocations]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < locations.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && locations[focusedIndex]) {
          handleSelect(locations[focusedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  const handleSelect = (location: Location) => {
    onSelect(location);
    onChange(location.name);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (!isOpen) setIsOpen(true);
    setFocusedIndex(-1);
  };

  const getTypeLabel = (type: Location['type'], name?: string) => {
    // Check if name contains "Golf Club" (case insensitive)
    if (name && /golf club/i.test(name)) {
      return 'Golf Club';
    }
    
    switch (type) {
      case 'club':
        return 'Golf Club';
      case 'resort':
        return 'Resort';
      case 'sports_club':
        return 'Sports Club';
      default:
        return '';
    }
  };

  return (
    <div className="relative flex-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full h-14 px-6 bg-transparent border-none outline-none text-white placeholder:text-white/60"
        autoComplete="off"
      />

      {/* Selected indicator */}
      {selectedLocation && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Check className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (locations.length > 0 || isLoading) && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-black/70 backdrop-blur-xl rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-white/30 overflow-hidden z-50 max-h-[320px] overflow-y-auto"
          >
            {isLoading ? (
              <div className="px-4 py-3 flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
                <span className="text-white/70 text-sm">Searching...</span>
              </div>
            ) : locations.length === 0 && value.trim().length >= 2 ? (
              <div className="px-4 py-3 text-white/70 text-sm text-center">
                No locations found
              </div>
            ) : (
              locations.map((location, index) => (
              <button
                key={location.id}
                type="button"
                onClick={() => handleSelect(location)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-white/30 transition-colors text-left ${
                  focusedIndex === index ? 'bg-white/30' : ''
                } ${selectedLocation?.id === location.id ? 'bg-[#D4AF37]/15' : ''}`}
              >
                <div className="mt-1 flex-shrink-0">
                  {location.source === 'bc_club' ? (
                    <BcClubIcon size={16} className="w-4 h-4" />
                  ) : (
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white">{location.name}</span>
                    {selectedLocation?.id === location.id && (
                      <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-sm text-white/70 truncate">
                    {location.address}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">
                    {getTypeLabel(location.type, location.name)}
                  </div>
                </div>
              </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
