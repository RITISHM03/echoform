import { nanoid } from 'nanoid';

// Function to generate a URL-friendly slug
// We can use nanoid for short unique IDs, or custom logic
export function generateSlug(title?: string): string {
    // If we wanted readable slugs: 
    // const base = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'form';
    // return `${base}-${nanoid(6)}`;

    // For now, simpler unique ID is safer and shorter
    // Custom alphabet for cleaner URLs (no underscores/dashes at ends)
    // using generic random string logic if nanoid is not installed or we want native

    // Simple random string generator
    return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 6);
}
