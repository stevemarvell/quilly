// src/services/titleGeneratorService.ts

import { callClaude } from './claudeService';
import { FourPsData } from '../screens/FourPsScreen';
import { OrganizedTerms } from './termOrganizerService';

export interface TitleOption {
  title: string;
  subtitle: string;
  reasoning: string;
}

export interface TitleSuggestions {
  options: TitleOption[];
}

const SYSTEM_PROMPT = `You are an expert book title creator specializing in non-fiction self-publishing.

Your task is to generate compelling book titles that:
- Follow the "Clear beats clever" principle (direct, not fancy wordplay)
- Incorporate the 4 P's: Person, Pain, Promise, and Perceived Value
- Are specific and benefit-focused
- Tell readers exactly what they'll get
- Use power words that create urgency or value
- Work well for Amazon/online book searches

Generate exactly 5 title + subtitle combinations. Each should be distinct in style:
1. A results-focused title (emphasizes the transformation)
2. A method-focused title (emphasizes your unique approach)
3. A problem-solution title (addresses pain directly)
4. A timeframe title (includes specific timeline/promise)
5. A contrarian/unique angle title

Return valid JSON only in this format:
{
  "options": [
    {
      "title": "Main Title Here",
      "subtitle": "Descriptive Subtitle Here",
      "reasoning": "Why this title works for this audience"
    }
  ]
}`;

/**
 * Generate book title options based on 4 P's framework
 */
export async function generateTitles(
  fourPsData: FourPsData,
  organizedData: OrganizedTerms,
  onProgress?: (message: string) => void
): Promise<TitleSuggestions> {

  onProgress?.('Analyzing your 4 P\'s framework...');

  // Extract key themes from organized data
  const mainDomains = organizedData.domains
    .slice(0, 3)
    .map(d => d.name)
    .join(', ');

  const userPrompt = `Generate 5 book title + subtitle combinations for this book:

BOOK TOPIC: ${fourPsData.bookTopic}

THE 4 P'S FRAMEWORK:

PERSON (Ideal Reader):
${fourPsData.person}

PAIN (Their Problem):
${fourPsData.pain}

PROMISE (Transformation):
${fourPsData.promise}

PERCEIVED VALUE:
${fourPsData.perceivedValue}

BOOK CONTENT THEMES:
The book covers these main domains: ${mainDomains}

REQUIREMENTS:
- Title should be 2-6 words, memorable and searchable
- Subtitle should clarify who it's for and what they'll achieve
- Must address the reader's pain and promise the transformation
- Use language that resonates with the target audience
- Each of the 5 options should take a different angle

Return valid JSON only, no additional text.`;

  try {
    onProgress?.('Generating creative title options...');

    const response = await callClaude(
      [
        {
          role: 'user',
          content: userPrompt
        }
      ],
      SYSTEM_PROMPT
    );

    onProgress?.('Parsing title suggestions...');

    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not find valid JSON in response');
    }

    const suggestions: TitleSuggestions = JSON.parse(jsonMatch[0]);

    // Validate structure
    if (!suggestions.options || !Array.isArray(suggestions.options)) {
      throw new Error('Invalid response structure: missing options array');
    }

    if (suggestions.options.length === 0) {
      throw new Error('No title options generated');
    }

    onProgress?.('Title generation complete!');

    return suggestions;

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate titles: ${error.message}`);
    }
    throw new Error('Failed to generate titles: Unknown error');
  }
}

/**
 * Analyze why a title works for the given 4 P's
 */
export function analyzeTitleEffectiveness(
  title: string,
  subtitle: string,
  fourPsData: FourPsData
): string {
  // Simple analysis - in production, could use Claude for deeper analysis
  const analysis: string[] = [];

  // Check if title addresses pain
  const painKeywords = fourPsData.pain.toLowerCase().split(' ');
  const titleLower = (title + ' ' + subtitle).toLowerCase();

  if (painKeywords.some(word => titleLower.includes(word) && word.length > 4)) {
    analysis.push('✓ Directly addresses reader\'s pain point');
  }

  // Check if it shows promise/benefit
  const promiseWords = ['master', 'confidence', 'guide', 'complete', 'professional', 'success'];
  if (promiseWords.some(word => titleLower.includes(word))) {
    analysis.push('✓ Communicates clear benefit/outcome');
  }

  // Check if it identifies person
  if (subtitle.toLowerCase().includes('beginner') ||
    subtitle.toLowerCase().includes('amateur') ||
    subtitle.toLowerCase().includes('professional')) {
    analysis.push('✓ Clearly identifies target audience');
  }

  // Check for specificity
  const numbers = titleLower.match(/\d+/);
  if (numbers) {
    analysis.push('✓ Uses specific timeframe/number for credibility');
  }

  // Always add general points
  analysis.push('✓ Clear and direct (not clever wordplay)');
  analysis.push('✓ Searchable on Amazon/Google');

  return analysis.join('\n');
}