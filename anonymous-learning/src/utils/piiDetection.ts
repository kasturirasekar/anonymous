export function detectPII(text: string): boolean {
  // Check for email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  
  // Check for phone numbers (very basic check for sequence of numbers that look like phone)
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  
  // Check for URLs
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  
  // Check for common social media handles (e.g. @username, but avoiding standard mentions if possible. 
  // For a strict privacy tool, we might block all @mentions or known platforms)
  const socialRegex = /(?:twitter\.com|t\.me|instagram\.com|linkedin\.com\/in)\/[a-zA-Z0-9_-]+/i;

  return emailRegex.test(text) || phoneRegex.test(text) || urlRegex.test(text) || socialRegex.test(text);
}
