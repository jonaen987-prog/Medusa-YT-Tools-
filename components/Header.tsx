
import React from 'react';

const MedusaIcon: React.FC = () => (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-fuchsia-400">
        <path d="M11 17.5C11 19.9853 8.98528 22 6.5 22C4.01472 22 2 19.9853 2 17.5C2 15.0147 4.01472 13 6.5 13C8.98528 13 11 15.0147 11 17.5Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 17.5C12 19.9853 14.0147 22 16.5 22C18.9853 22 21 19.9853 21 17.5C21 15.0147 18.9853 13 16.5 13" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M19.5 7C19.5 9.20914 17.7091 11 15.5 11C13.2909 11 11.5 9.20914 11.5 7C11.5 4.79086 13.2909 3 15.5 3C17.7091 3 19.5 4.79086 19.5 7Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12.5 7C12.5 9.20914 10.7091 11 8.5 11C6.29086 11 4.5 9.20914 4.5 7C4.5 4.79086 6.29086 3 8.5 3C10.7091 3 12.5 4.79086 12.5 7Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 11.5C12 14.2614 9.76142 16.5 7 16.5C4.23858 16.5 2 14.2614 2 11.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 11.5C11 14.2614 13.2386 16.5 16 16.5C18.7614 16.5 21 14.2614 21 11.5C21 8.73858 18.7614 6.5 16 6.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const Header: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 p-4 border-b border-gray-800 group">
      <div className="transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-6">
        <MedusaIcon />
      </div>
      <div>
        <h1 className="text-xl font-bold text-white">Medusa YT Tools</h1>
        <p className="text-xs font-semibold bg-gradient-to-r from-fuchsia-400 to-purple-400 text-transparent bg-clip-text">Premium AI Suite for Creators</p>
      </div>
    </div>
  );
};

export default Header;