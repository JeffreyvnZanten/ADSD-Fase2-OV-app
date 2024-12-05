import React from 'react';
import '../styles/message-display.css';

interface MessageDisplayProps {
    title?: string;
    content: string | string[];
    type?: 'error' | 'default' | 'route';
}

const normalizeContent = (content: string | string[]): string[] => {
    return Array.isArray(content) ? content : [content];
};

export default function MessageDisplay({ 
    title, 
    content, 
    type = 'default'
}: MessageDisplayProps) {
    const contentArray = normalizeContent(content);
    
    // We gebruiken een unieke key om React en de screenreader te vertellen
    // dat dit een volledig nieuw element is
    const uniqueKey = `message-${Date.now()}`;

    return (
        <div 
            // De key zorgt ervoor dat React het element opnieuw opbouwt
            key={uniqueKey}
            className={`message-display ${type}`}
            // We gebruiken zowel role als aria-live om de screenreader te informeren
            role="alert"
            aria-live="assertive"
            // Dit zorgt ervoor dat de hele boodschap wordt voorgelezen
            aria-atomic="true"
            // Dit vertelt de screenreader dat dit belangrijke informatie is
            aria-relevant="additions text"
        >
            {title && <h2>{title}</h2>}
            <p>{contentArray[0]}</p>
        </div>
    );
}