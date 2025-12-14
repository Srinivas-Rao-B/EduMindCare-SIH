import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
    >
      <ChevronLeft className="w-4 h-4" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
