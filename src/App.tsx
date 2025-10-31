import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { BookingPage } from './components/BookingPage';
import { ClubAccessComponent } from './components/ClubAccessComponent';
import { ClubOnboardingOverlay } from './components/ClubOnboardingOverlay';
import { Toaster } from './components/ui/sonner';
// TODO: Replace with actual hero image path
// Placeholder - you'll need to add the actual image to src/assets/images or public/images
const heroImage = '/images/hero-image.png'; // or import from src/assets/images/hero-image.png

type ViewMode = 'home' | 'clubAccess' | 'booking';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [quoteData, setQuoteData] = useState({ from: '', to: '' });
  const [entryMode, setEntryMode] = useState<'QuickQuote' | 'StartJourney'>('QuickQuote');
  const [showOverlay, setShowOverlay] = useState(false);

  const handleGetQuote = (from: string, to: string) => {
    setQuoteData({ from, to });
    setEntryMode('QuickQuote');
    setViewMode('clubAccess');
  };

  const handleStartJourney = () => {
    setQuoteData({ from: '', to: '' });
    setEntryMode('StartJourney');
    setViewMode('clubAccess');
  };

  const handleClubAccessComplete = () => {
    setShowOverlay(true);
  };

  const handleBackToHome = () => {
    setViewMode('home');
    setQuoteData({ from: '', to: '' });
    setShowOverlay(false);
  };

  if (viewMode === 'clubAccess') {
    return (
      <>
        <ClubAccessComponent 
          entryMode={entryMode}
          from={quoteData.from}
          to={quoteData.to}
          onComplete={handleClubAccessComplete}
        />
        <ClubOnboardingOverlay 
          isOpen={showOverlay} 
          onClose={handleBackToHome} 
        />
        <Toaster />
      </>
    );
  }

  if (viewMode === 'booking') {
    return (
      <>
        <BookingPage from={quoteData.from} to={quoteData.to} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#000000]">
        {/* Hero Section */}
        <HeroSection 
          backgroundImage={heroImage}
          onGetQuote={handleGetQuote}
        />
      </div>
      <Toaster />
    </>
  );
}
