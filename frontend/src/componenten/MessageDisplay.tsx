// MessageDisplay.tsx
import React from 'react';
import '../styles/message-display.css';

interface MessageDisplayProps {
    /** Optional title to display above the message content */
    title?: string;
    /** Message content as either a single string or array of strings */
    content: string | string[];
    /** Display type that determines styling and accessibility behavior 
     * @default 'default'
     */
    type?: 'error' | 'default' | 'route';
}

/**
 * Ensures content is always handled as an array of strings
 * @param content - Single string or array of strings
 * @returns Array of strings, converting single string to single-element array if needed
 */
const normalizeContent = (content: string | string[]): string[] => {
    return Array.isArray(content) ? content : [content];
};

/**
 * Determines appropriate aria-live value based on message type
 * @param type - The type of message being displayed
 * @returns Appropriate aria-live value for accessibility
 */
const getAriaLive = (type: 'error' | 'default' | 'route') => {
    switch (type) {
        case 'error':
            return 'assertive';  // Announce errors immediately
        case 'route':
            return 'assertive';  // Announce route changes immediately
        default:
            return 'off';        // Don't automatically announce other content
    }
};

/**
 * A flexible component for displaying messages with consistent styling and accessibility
 * Supports single messages or lists of messages with optional titles
 * 
 * @component
 * @param props - Component props
 * @param props.title - Optional heading for the message
 * @param props.content - Message content (single string or array of strings)
 * @param props.type - Display type affecting styling and accessibility behavior
 * 
 * @example
 * // Error message with title
 * <MessageDisplay 
 *   title="Error" 
 *   content="Invalid input" 
 *   type="error" 
 * />
 */
export default function MessageDisplay({ 
    title, 
    content, 
    type = 'default' 
}: MessageDisplayProps) {
    const contentArray = normalizeContent(content);

    return (
        <div 
            className={`message-display ${type}`}
            role="alert"
            aria-live="assertive"
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