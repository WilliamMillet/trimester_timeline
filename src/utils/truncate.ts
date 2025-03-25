/**
 * Truncates a given string to the specified length.
 *
 * @param str - The string to truncate.
 * @param maxLength - The maximum length of the returned string.
 * @returns The truncated string if its length exceeds maxLength; otherwise, the original string.
 */
const truncate = (str: string, maxLength: number): string => {
    if (str.length <= maxLength) {
        return str;
    }
    return str.substring(0, maxLength) + '...';
};

export default truncate;