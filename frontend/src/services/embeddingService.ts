// src/services/embeddingService.ts

const BACKEND_URL = 'http://localhost:8000/api/embeddings';

export interface EmbeddingResponse {
  data: Array<{
    embedding: number[];
    index: number;
  }>;
  model: string;
  usage: {
    total_tokens: number;
  };
}

export interface TermWithEmbedding {
  term: string;
  embedding: number[];
}

/**
 * Generate embeddings for a list of terms
 */
export async function generateEmbeddings(terms: string[]): Promise<TermWithEmbedding[]> {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        texts: terms
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Embedding API error: ${response.status} - ${errorData.error?.message || response.statusText}`
      );
    }

    const data: EmbeddingResponse = await response.json();

    return terms.map((term, idx) => ({
      term,
      embedding: data.data[idx].embedding
    }));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to generate embeddings: ${error.message}`);
    }
    throw new Error('Failed to generate embeddings: Unknown error');
  }
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (normA * normB);
}

/**
 * Calculate similarity matrix for all terms
 */
export function calculateSimilarityMatrix(
  termsWithEmbeddings: TermWithEmbedding[]
): Map<string, Map<string, number>> {
  const matrix = new Map<string, Map<string, number>>();

  for (let i = 0; i < termsWithEmbeddings.length; i++) {
    const termA = termsWithEmbeddings[i];
    const similarities = new Map<string, number>();

    for (let j = 0; j < termsWithEmbeddings.length; j++) {
      if (i === j) {
        similarities.set(termsWithEmbeddings[j].term, 1.0);
        continue;
      }

      const termB = termsWithEmbeddings[j];
      const similarity = cosineSimilarity(termA.embedding, termB.embedding);
      similarities.set(termB.term, similarity);
    }

    matrix.set(termA.term, similarities);
  }

  return matrix;
}

/**
 * Find the N most similar terms to a given term
 */
export function findMostSimilarTerms(
  term: string,
  similarityMatrix: Map<string, Map<string, number>>,
  n: number = 5
): Array<{ term: string; similarity: number }> {
  const similarities = similarityMatrix.get(term);

  if (!similarities) {
    return [];
  }

  const sortedSimilarities = Array.from(similarities.entries())
    .filter(([t]) => t !== term) // Exclude the term itself
    .map(([t, sim]) => ({ term: t, similarity: sim }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, n);

  return sortedSimilarities;
}

/**
 * Create similarity summary for Claude's context
 */
export function createSimilaritySummary(
  termsWithEmbeddings: TermWithEmbedding[],
  topN: number = 3
): string {
  const matrix = calculateSimilarityMatrix(termsWithEmbeddings);
  const lines: string[] = [];

  for (const termData of termsWithEmbeddings) {
    const similar = findMostSimilarTerms(termData.term, matrix, topN);
    if (similar.length > 0) {
      const similarList = similar
        .map(s => `${s.term} (${s.similarity.toFixed(2)})`)
        .join(', ');
      lines.push(`"${termData.term}" is most similar to: ${similarList}`);
    }
  }

  return lines.join('\n');
}