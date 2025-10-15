// src/services/stateService.ts

import { OrganizedTerms } from './termOrganizerService';

const STATE_KEY = 'quilly_book_state';

export interface BookState {
  currentPage: string;
  topicData: {
    paidFor: string;
    passionate: string;
    adviceGiven: string;
    brokenRecord: string;
    chosenTopic: string;
  } | null;
  mindMapData: {
    wordList: string;
    organized: OrganizedTerms;
  } | string | null; // Allow string for backward compatibility
  lastUpdated: string;
}

const defaultState: BookState = {
  currentPage: 'what-to-write',
  topicData: null,
  mindMapData: null,
  lastUpdated: new Date().toISOString(),
};

/**
 * Save state to localStorage
 */
export function saveState(state: Partial<BookState>): void {
  try {
    const currentState = loadState();
    const newState = {
      ...currentState,
      ...state,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STATE_KEY, JSON.stringify(newState));
  } catch (error) {
    console.error('Failed to save state:', error);
  }
}

/**
 * Load state from localStorage
 */
export function loadState(): BookState {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load state:', error);
  }
  return defaultState;
}

/**
 * Clear all saved state (start over)
 */
export function clearState(): void {
  try {
    localStorage.removeItem(STATE_KEY);
  } catch (error) {
    console.error('Failed to clear state:', error);
  }
}

/**
 * Check if there's any saved progress
 */
export function hasSavedProgress(): boolean {
  try {
    const saved = localStorage.getItem(STATE_KEY);
    return saved !== null;
  } catch (error) {
    return false;
  }
}