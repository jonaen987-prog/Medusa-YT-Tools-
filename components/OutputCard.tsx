
import React from 'react';
import CopyButton from './CopyButton';

interface OutputCardProps {
  title: string;
  content: string | string[];
  variant?: 'text' | 'list' | 'tags' | 'chapters';
}

const ClockIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const OutputCard: React.FC<OutputCardProps> = ({ title, content, variant = 'text' }) => {
    const textToCopy = Array.isArray(content) ? content.join(variant === 'tags' ? ', ' : '\n') : content;
    
    const renderContent = () => {
        if (!Array.isArray(content)) {
            return <p className="text-gray-300 whitespace-pre-wrap text-sm">{content}</p>;
        }

        switch(variant) {
            case 'chapters':
                return (
                    <ul className="space-y-2">
                        {content.map((item, index) => (
                            <li key={index} className="flex items-center text-gray-300 bg-gray-800/50 p-2 rounded-md text-sm">
                                <ClockIcon className="w-4 h-4 mr-2 text-fuchsia-400 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                );
            case 'list':
                 return (
                     <ul className="space-y-2">
                        {content.map((item, index) => (
                            <li key={index} className="text-gray-300 bg-gray-800/50 p-2 rounded-md text-sm">{item}</li>
                        ))}
                    </ul>
                );
            case 'tags':
                return (
                    <div className="flex flex-wrap gap-2">
                        {content.map((item, index) => (
                            <span key={index} className="bg-gray-700 text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full transition-colors hover:bg-fuchsia-600/80 cursor-default">{item}</span>
                        ))}
                    </div>
                );
            default:
                return <p className="text-gray-300 whitespace-pre-wrap text-sm">{content.join('\n')}</p>;
        }
    };

    return (
        <div className="relative bg-[#0f0f1b]/70 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-bold text-fuchsia-400 mb-3">{title}</h3>
            <CopyButton textToCopy={textToCopy} />
            {renderContent()}
        </div>
    );
};

export default OutputCard;
