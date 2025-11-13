import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { Toaster } from './components/ui/sonner';
// TODO: Replace with actual hero image path
// Placeholder - you'll need to add the actual image to src/assets/images or public/images

type ViewMode = 'home';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [quoteData, setQuoteData] = useState({ from: '', to: '' });
  const [entryMode, setEntryMode] = useState<'QuickQuote' | 'StartJourney'>('QuickQuote');
  

  const handleGetQuote = (from: string, to: string) => {
    setQuoteData({ from, to });
  };

  
  return (
    <>
      <div>
        {/* Hero Section */}
        <HeroSection 
          onGetQuote={handleGetQuote}
        />
      </div>
      <Toaster />
    </>
  );
}
