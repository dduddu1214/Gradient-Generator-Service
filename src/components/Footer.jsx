import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-800">
      <div className="text-center">
        <p className="text-gray-400 flex items-center justify-center gap-2">
          Made by{' '}
          <span className="font-semibold text-white">devdduddu</span>
          <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;