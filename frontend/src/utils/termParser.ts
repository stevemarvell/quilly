// src/utils/termParser.ts

export interface ParsedTerms {
  terms: string[];
  stats: {
    total: number;
    unique: number;
    duplicatesRemoved: number;
    emptyRemoved: number;
  };
}

/**
 * Parse raw text input into clean, deduplicated terms
 */
export function parseTerms(input: string): ParsedTerms {
  if (!input || !input.trim()) {
    return {
      terms: [],
      stats: {
        total: 0,
        unique: 0,
        duplicatesRemoved: 0,
        emptyRemoved: 0
      }
    };
  }

  // Split by common delimiters: commas, newlines, semicolons, pipes
  const rawTerms = input
    .split(/[,\n\r;|]+/)
    .map(term => term.trim())
    .filter(term => term.length > 0);

  const totalRaw = rawTerms.length;
  const emptyRemoved = input.split(/[,\n\r;|]+/).length - totalRaw;

  // Remove duplicates (case-insensitive)
  const seenTerms = new Set<string>();
  const uniqueTerms: string[] = [];

  rawTerms.forEach(term => {
    const normalized = term.toLowerCase();
    if (!seenTerms.has(normalized)) {
      seenTerms.add(normalized);
      uniqueTerms.push(term); // Keep original casing
    }
  });

  const duplicatesRemoved = totalRaw - uniqueTerms.length;

  return {
    terms: uniqueTerms,
    stats: {
      total: totalRaw,
      unique: uniqueTerms.length,
      duplicatesRemoved,
      emptyRemoved
    }
  };
}

/**
 * Validate that terms meet minimum requirements
 */
export function validateTerms(terms: string[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (terms.length === 0) {
    errors.push('No terms provided');
  }

  if (terms.length < 5) {
    errors.push('At least 5 terms are recommended for meaningful clustering');
  }

  if (terms.length > 500) {
    errors.push('Too many terms (max 500). Consider breaking into smaller groups.');
  }

  // Check for very long terms (might be sentences)
  const longTerms = terms.filter(t => t.split(' ').length > 8);
  if (longTerms.length > 0) {
    errors.push(`${longTerms.length} terms appear to be full sentences. Use keywords or phrases instead.`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}