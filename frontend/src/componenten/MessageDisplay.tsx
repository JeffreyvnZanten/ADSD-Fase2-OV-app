import React from 'react';
import '../styles/message-display.css';

interface MessageDisplayProps {
    title?: string;
    content: string | string[];
    type?: 'error' | 'default' | 'route';
}

// Normalize the content to always be an array
const normalizeContent = (content: string | string[]): string[] => {
    return Array.isArray(content) ? content : [content];
};

// This component is used to display messages to the user.
export default function MessageDisplay({ 
    title, 
    content, 
    type = 'default'
}: MessageDisplayProps) {
    const contentArray = normalizeContent(content);
    
    // We use a unique key to tell React and the screenreader
    // This is a completely new element
    const uniqueKey = `message-${Date.now()}`;

    return (
        <div 
            // The key tells React to rebuild the element
            key={uniqueKey}
            className={`message-display ${type}`}
            // We use both role and aria-live to inform the screenreader
            role="alert"
            aria-live="assertive"
            // This makes sure the whole message gets told by the screenreader
            aria-atomic="true"
            // This tells the screenreader it's important information
            aria-relevant="additions text"
        >
            {title && <h2>{title}</h2>}
            <p>{contentArray[0]}</p>
        </div>
    );
}