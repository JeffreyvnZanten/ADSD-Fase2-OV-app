/**
 * Text-to-Speech Utility
 * 
 * This module provides speech synthesis functionality for accessibility features.
 * It uses the Web Speech API, which is built into modern browsers.
 * 
 * Key Concepts:
 * - SpeechSynthesisUtterance: Web API for converting text to speech
 * - window.speechSynthesis: Browser's speech engine
 * - lang: Language setting for pronunciation
 * 
 * Example Usage:
 * speak("Hello user"); // Browser will speak this text
 */

/**
 * Converts text to speech using the browser's built-in speech synthesis
 * 
 * @param {string} text - The text that should be spoken
 * 
 * Implementation Details:
 * 1. Creates a new speech utterance with the provided text
 * 2. Sets the language to Dutch (nl-NL)
 * 3. Uses the browser's speech synthesis to speak the text
 * 
 * Note: This function is non-blocking - it returns immediately while
 * the speech continues in the background
 */
export function speak(text: string) {
    // Create a new utterance instance for this piece of text
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language to Dutch for correct pronunciation
    utterance.lang = 'nl-NL';
    
    // Tell the browser to speak the text
    window.speechSynthesis.speak(utterance);
}