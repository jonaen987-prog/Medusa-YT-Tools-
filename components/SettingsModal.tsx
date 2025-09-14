import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { getTone, saveTone, TONES } from '../services/settingsService';
import type { AiTone } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const [selectedTone, setSelectedTone] = useState<AiTone>(getTone());

    useEffect(() => {
        if (isOpen) {
            setSelectedTone(getTone());
        }
    }, [isOpen]);

    const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTone = e.target.value as AiTone;
        setSelectedTone(newTone);
        saveTone(newTone);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Settings">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-gray-200">AI Tone of Voice</h3>
                    <p className="mt-1 text-sm text-gray-400">
                        Choose the default tone for all AI generations. This will help the output match your brand's personality.
                    </p>
                    <select
                        id="tone"
                        name="tone"
                        value={selectedTone}
                        onChange={handleToneChange}
                        className="mt-3 block w-full pl-3 pr-10 py-2 text-base bg-[#0f0f1b] border-gray-600 focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500 sm:text-sm rounded-md"
                    >
                        {TONES.map(tone => (
                            <option key={tone} value={tone}>{tone}</option>
                        ))}
                    </select>
                </div>
                 <div className="p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-300">
                        <strong>Tip:</strong> A 'Witty' tone might be great for entertainment content, while 'Professional' is better suited for educational or business videos.
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default SettingsModal;
