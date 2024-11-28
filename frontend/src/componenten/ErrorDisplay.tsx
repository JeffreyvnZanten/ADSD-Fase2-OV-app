// ErrorDisplay.tsx
import React from 'react';
import MessageDisplay from './MessageDisplay';

interface ErrorDisplayProps {
    /** The error message to be displayed */
    message: string;
}

/**
 * Helper function that ensures error messages end with a period
 * @param message - The original error message
 * @returns The formatted error message with a trailing period
 */
const formatErrorMessage = (message: string): string => {
    return message.endsWith('.') ? message : `${message}.`;
};

/**
 * A component that displays error messages in a consistent format
 * Wraps MessageDisplay component with error-specific styling and formatting
 * 
 * @component
 * @param props - Component props
 * @param props.message - The error message to display
 * @example
 * <ErrorDisplay message="Invalid input" />
 */
export default function ErrorDisplay({ 
    message 
}: ErrorDisplayProps) {
    const formattedMessage = formatErrorMessage(message);

    return (
        <MessageDisplay
            content={formattedMessage}
            type="error"
        />
    );
}