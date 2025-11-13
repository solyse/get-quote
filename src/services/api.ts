// API service for BC Quote application

import { envConfig } from '../config/env';

// Types for Places Autocomplete API
export interface PlaceAddress {
  email?: string;
  phone?: string;
  address1?: string;
  city?: string;
  province?: string;
  provinceCode?: string;
  zip?: string;
  country?: string;
  countryCodeV2?: string;
}

export interface PlacePrediction {
  place: string;
  placeId: string;
  text: {
    text: string;
    matches: Array<{
      startOffset?: number;
      endOffset?: number;
    }>;
  };
  structuredFormat: {
    mainText: {
      text: string;
      matches: Array<{
        startOffset?: number;
        endOffset?: number;
      }>;
    };
    secondaryText: {
      text: string;
      matches: Array<{
        startOffset?: number;
        endOffset?: number;
      }>;
    };
  };
  types: string[];
  icon?: string;
  source?: string;
  address?: PlaceAddress;
}

export interface PlacesAutocompleteResponse {
  x: number;
  data: Array<{
    placePrediction: PlacePrediction;
  }>;
  epsid: string;
  duration: number;
  memory: string;
  core_version?: string;
}

export interface PlacesAutocompleteRequest {
  query: string;
}

// Types for Place Details API
export interface AddressComponent {
  longText: string;
  shortText: string;
  types: string[];
  languageCode: string;
}

export interface PlaceDetailsData {
  name: string;
  id: string;
  types: string[];
  formattedAddress: string;
  addressComponents: AddressComponent[];
  displayName: {
    text: string;
    languageCode: string;
  };
}

export interface PlaceDetailsResponse {
  x: number;
  data: PlaceDetailsData;
  epsid: string;
  duration: number;
  memory: string;
  core_version?: string;
}

export interface PlaceDetailsRequest {
  place_id: string;
}

// API service class
export class ApiService {
  private static instance: ApiService;
  private baseURL: string;

  private constructor() {
    this.baseURL = envConfig.apiBaseUrl;
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * Get place details by place ID
   * @param placeId - Place ID from autocomplete
   * @returns Promise with place details including address components
   */
  public async getPlaceDetails(placeId: string): Promise<PlaceDetailsResponse> {
    try {
      if (!placeId || placeId.trim().length === 0) {
        throw new Error('Place ID is required');
      }

      const response = await fetch(`${this.baseURL}/place-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ place_id: placeId.trim() } as PlaceDetailsRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: PlaceDetailsResponse = await response.json();
      return responseData;
    } catch (error) {
      console.error('Place Details API Error:', error);
      
      // Return error response structure
      return {
        x: 400,
        data: {
          name: '',
          id: '',
          types: [],
          formattedAddress: '',
          addressComponents: [],
          displayName: { text: '', languageCode: '' },
        },
        epsid: '',
        duration: 0,
        memory: '0',
      };
    }
  }

  /**
   * Get place autocomplete suggestions
   * @param query - Search query string
   * @returns Promise with place predictions
   */
  public async getPlacesAutocomplete(query: string): Promise<PlacesAutocompleteResponse> {
    try {
      if (!query || query.trim().length === 0) {
        return {
          x: 200,
          data: [],
          epsid: '',
          duration: 0,
          memory: '0',
        };
      }

      const response = await fetch(`${this.baseURL}/places-autocomplete2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query.trim() } as PlacesAutocompleteRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PlacesAutocompleteResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Places Autocomplete API Error:', error);
      
      // Return empty response on error
      return {
        x: 400,
        data: [],
        epsid: '',
        duration: 0,
        memory: '0',
      };
    }
  }
}

// Export singleton instance
export const apiService = ApiService.getInstance();

