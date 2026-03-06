export function formatDatetime(isoDateStr: string): string {
    // Create a Date object from the ISO 8601 string
    const date = new Date(isoDateStr);
    
    // Extract the components of the date
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(date.getUTCFullYear()).slice(-2); // Get last two digits of the year
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    
    // Format the date and time as required
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
}


