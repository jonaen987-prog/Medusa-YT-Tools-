import React from 'react';
import Modal from './Modal';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome to Medusa YT Tools!">
      <div className="space-y-4">
        <p>This is your premium AI-powered suite to help you create, optimize, and grow your YouTube channel.</p>
        
        <div>
          <h4 className="font-bold text-fuchsia-400">Getting Started</h4>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            <li>Try the <strong className="text-gray-200">Full Video SEO Maker</strong> to generate a complete optimization package from your script.</li>
            <li>Visit the <strong className="text-gray-200">Channel Brand Kit</strong> under "Management" to save your recurring links and descriptions.</li>
            <li>Click the <strong className="text-gray-200">gear icon</strong> in the sidebar to set your preferred AI Tone of Voice.</li>
          </ul>
        </div>

        <p>Explore the tools in the sidebar to brainstorm ideas, create script outlines, and much more. Happy creating!</p>
      </div>
    </Modal>
  );
};

export default WelcomeModal;