import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const GuideButton = ({ page = 'product' }) => {
  const [showGuide, setShowGuide] = useState(false);

  const handleClick = () => {
    // Clear the seen guide flag for this page
    const seenGuides = JSON.parse(localStorage.getItem('seenGuides') || '{}');
    delete seenGuides[page];
    localStorage.setItem('seenGuides', JSON.stringify(seenGuides));
    
    // Trigger guide by reloading or using a callback
    window.location.reload();
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 font-semibold text-sm"
      title="View guide again"
    >
      <HelpCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Guide</span>
    </button>
  );
};

export default GuideButton;
