// src/services/claudeService.ts

const BACKEND_URL = 'http://localhost:3001/api/claude';

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  model: string;
  stop_reason: string;
}

/**
 * Call Claude API through backend proxy
 */
export async function callClaude(
  messages: ClaudeMessage[],
  systemPrompt?: string
): Promise<string> {

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        system: systemPrompt
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Backend API error: ${response.status} - ${errorData.error?.message || response.statusText}`
      );
    }

    const data: ClaudeResponse = await response.json();

    if (data.content && data.content.length > 0) {
      return data.content[0].text;
    }

    throw new Error('No response content from Claude API');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to call Claude API: ${error.message}`);
    }
    throw new Error('Failed to call Claude API: Unknown error');
  }
}

/**
 * Test the API connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    await callClaude([
      {
        role: 'user',
        content: 'Reply with just the word "connected" if you receive this message.'
      }
    ]);
    return true;
  } catch (error) {
    console.error('Claude API connection test failed:', error);
    return false;
  }
}