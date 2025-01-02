// utils/security.ts
/**
 * Sanitizes a search query by removing special characters and limiting length
 * @param query - Raw search query from user input
 * @returns Sanitized query string safe for database operations
 */
export const sanitizeQuery = (query: string): string => {
    return query
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .substring(0, 50);
};

/**
 * Sanitizes a string for safe HTML rendering
 * @param str - Raw string that might contain HTML
 * @returns HTML-escaped string safe for rendering
 */
export const sanitizeHtml = (str: string): string => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
};