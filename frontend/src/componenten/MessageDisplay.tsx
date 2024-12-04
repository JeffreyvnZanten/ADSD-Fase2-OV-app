import React from 'react';
import '../styles/message-display.css';

interface MessageDisplayProps {
    /** Optional title to display above the message content */
    title?: string;
    /** Message content as either a single string or array of strings */
    content: string | string[];
    /** Display type that determines styling and accessibility behavior */
    type?: 'error' | 'default' | 'route';
    /** ARIA role for accessibility */
    role?: 'alert' | 'status';
}

/**
 * Ensures content is always handled as an array of strings
 */
const normalizeContent = (content: string | string[]): string[] => {
    return Array.isArray(content) ? content : [content];
};

/**
 * A flexible component for displaying messages with consistent styling and accessibility
 */
// MessageDisplay.tsx
export default function MessageDisplay({ 
    title, 
    content, 
    type = 'default'
}: MessageDisplayProps) {
    const contentArray = normalizeContent(content);

    return (
        <div 
            className={`message-display ${type}`}
            role="alert"  // This will make both errors and routes be announced
        >
            {title && <h2>{title}</h2>}
            {contentArray.length > 1 ? (
                <ol>
                    {contentArray.map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ol>
            ) : (
                <p>{contentArray[0]}</p>
            )}
        </div>
    );
}