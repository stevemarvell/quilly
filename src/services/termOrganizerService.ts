// src/services/termOrganizerService.ts

import { callClaude } from './claudeService';

export interface TermCluster {
  id: string;
  name: string;
  terms: string[];
}

export interface TermDomain {
  id: string;
  name: string;
  clusters: TermCluster[];
}

export interface OrganizedTerms {
  domains: TermDomain[];
  generalTerms: string[];
}

const SYSTEM_PROMPT = `You are an expert at semantic analysis and term organization. Your task is to analyze a list of terms and organize them into a 3-level hierarchical structure:

Level 1: DOMAINS - Broad conceptual areas (3-5 domains)
Level 2: CLUSTERS - Tightly coupled term groups within each domain (2-4 clusters per domain)
Level 3: TERMS - Individual terms within each cluster

You must also identify GENERAL TERMS - domain-agnostic words like "however", "important", "strategy", "effective" that are connective tissue rather than specific concepts.

Return your response as valid JSON in this exact format:
{
  "domains": [
    {
      "id": "1",
      "name": "Domain Name",
      "clusters": [
        {
          "id": "1-1",
          "name": "Cluster Name",
          "terms": ["term1", "term2", "term3"]
        }
      ]
    }
  ],
  "generalTerms": ["however", "important", "strategy"]
}

Guidelines:
- Domain names should be descriptive and capture the essence of their clusters
- Cluster names should describe the semantic relationship between terms
- Each cluster should have 3-8 tightly related terms
- General terms are typically: conjunctions, adjectives, adverbs, or generic business words
- Ensure every input term appears exactly once in either a cluster or generalTerms
- Use the exact original spelling/casing of terms provided`;

/**
 * Organize terms using Claude API
 */
export async function organizeTerms(
  terms: string[],
  onProgress?: (step: string) => void
): Promise<OrganizedTerms> {

  if (terms.length === 0) {
    throw new Error('No terms provided');
  }

  onProgress?.('Analyzing term relationships...');

  const userPrompt = `Please organize these ${terms.length} terms into a hierarchical structure:

${terms.map((term, i) => `${i + 1}. ${term}`).join('\n')}

Remember to:
1. Create 3-5 broad domains
2. Group related terms into clusters (2-4 clusters per domain)
3. Identify general/connective terms
4. Return valid JSON only, no additional text`;

  try {
    onProgress?.('Requesting analysis from Claude...');

    const response = await callClaude(
      [
        {
          role: 'user',
          content: userPrompt
        }
      ],
      SYSTEM_PROMPT
    );

    onProgress?.('Parsing organization structure...');

    // Extract JSON from response (in case Claude adds explanation)
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not find valid JSON in Claude response');
    }

    const organized: OrganizedTerms = JSON.parse(jsonMatch[0]);

    // Validate the structure
    if (!organized.domains || !Array.isArray(organized.domains)) {
      throw new Error('Invalid response structure: missing domains array');
    }

    if (!organized.generalTerms || !Array.isArray(organized.generalTerms)) {
      throw new Error('Invalid response structure: missing generalTerms array');
    }

    // Verify all terms are accounted for
    const organizedTermSet = new Set<string>();
    organized.domains.forEach(domain => {
      domain.clusters.forEach(cluster => {
        cluster.terms.forEach(term => {
          organizedTermSet.add(term.toLowerCase());
        });
      });
    });
    organized.generalTerms.forEach(term => {
      organizedTermSet.add(term.toLowerCase());
    });

    const inputTermSet = new Set(terms.map(t => t.toLowerCase()));
    const missing = terms.filter(t => !organizedTermSet.has(t.toLowerCase()));

    if (missing.length > 0) {
      console.warn('Some terms were not organized:', missing);
    }

    onProgress?.('Organization complete!');

    return organized;

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to organize terms: ${error.message}`);
    }
    throw new Error('Failed to organize terms: Unknown error');
  }
}

/**
 * Validate organized terms structure
 */
export function validateOrganizedTerms(organized: OrganizedTerms): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!organized.domains || organized.domains.length === 0) {
    errors.push('No domains found');
  }

  if (organized.domains) {
    organized.domains.forEach((domain, i) => {
      if (!domain.name) {
        errors.push(`Domain ${i + 1} has no name`);
      }
      if (!domain.clusters || domain.clusters.length === 0) {
        errors.push(`Domain "${domain.name}" has no clusters`);
      }

      domain.clusters?.forEach((cluster, j) => {
        if (!cluster.name) {
          errors.push(`Cluster ${j + 1} in domain "${domain.name}" has no name`);
        }
        if (!cluster.terms || cluster.terms.length === 0) {
          errors.push(`Cluster "${cluster.name}" has no terms`);
        }
      });
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}