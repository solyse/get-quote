// Storage service for managing local storage operations

import { Location } from '../components/AutocompleteInput';

const QUOTE_STORAGE_KEY = "_bc_quote";

export interface QuoteData {
  from: Location;
  to: Location;
}

// Storage service class
export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Check if localStorage is available
   * @returns boolean indicating if localStorage is available
   */
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Store quote data in localStorage
   * @param data - Quote data to store
   * @returns boolean indicating success
   */
  public setQuote(data: QuoteData): boolean {
    if (!this.isLocalStorageAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }

    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(QUOTE_STORAGE_KEY, serializedData);
      return true;
    } catch (error) {
      console.error(`Error setting quote in localStorage:`, error);
      return false;
    }
  }

  /**
   * Get quote data from localStorage
   * @returns Quote data or null if not found/error
   */
  public getQuote(): QuoteData | null {
    if (!this.isLocalStorageAvailable()) {
      console.warn('localStorage is not available');
      return null;
    }

    try {
      const item = localStorage.getItem(QUOTE_STORAGE_KEY);
      
      if (item === null) {
        return null;
      }

      return JSON.parse(item) as QuoteData;
    } catch (error) {
      console.error(`Error getting quote from localStorage:`, error);
      return null;
    }
  }

  /**
   * Remove quote data from localStorage
   * @returns boolean indicating success
   */
  public removeQuote(): boolean {
    if (!this.isLocalStorageAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }

    try {
      localStorage.removeItem(QUOTE_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error(`Error removing quote from localStorage:`, error);
      return false;
    }
  }

  /**
   * Check if quote data exists
   * @returns boolean indicating if data exists
   */
  public hasQuote(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }

    try {
      return localStorage.getItem(QUOTE_STORAGE_KEY) !== null;
    } catch (error) {
      console.error(`Error checking quote in localStorage:`, error);
      return false;
    }
  }
}

// Export singleton instance
export const storageService = StorageService.getInstance();

// Convenience functions
export const storage = {
  setQuote: (data: QuoteData): boolean => {
    return storageService.setQuote(data);
  },
  getQuote: (): QuoteData | null => {
    return storageService.getQuote();
  },
  removeQuote: (): boolean => {
    return storageService.removeQuote();
  },
  hasQuote: (): boolean => {
    return storageService.hasQuote();
  },
};

