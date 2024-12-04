import React from 'react';
import MessageDisplay from './MessageDisplay';

interface ErrorDisplayProps {
    /** The error message to be displayed */
    message: string;
}

/**
 * Helper function that ensures error messages end with a period
 */
const formatErrorMessage = (message: string): string => {
    return message.endsWith('.') ? message : `${message}.`;
};

/**
 * A component that displays error messages in a consistent format
 */
export default function ErrorDisplay({ 
    message 
}: ErrorDisplayProps) {
    const formattedMessage = formatErrorMessage(message);

    return (
        <MessageDisplay
            content={formattedMessage}
            type="error"
            role="alert"
        />
    );
}