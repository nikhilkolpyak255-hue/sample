import { Service } from '@angular/core';
import {Injectable} from '@angular/core';
@Service()
export class SessionStorage {
    
    /**
   * Save data
   */
  setItem<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get data
   */
  getItem<T>(key: string): T | null {
    const data = sessionStorage.getItem(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  /**
   * Remove one item
   */
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * Check key exists
   */
  hasItem(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }

  /**
   * Clear all session storage
   */
  clear(): void {
    sessionStorage.clear();
  }

  /**
   * Get all keys
   */
  keys(): string[] {
    return Object.keys(sessionStorage);
  }

  /**
   * Save image (Base64)
   */
  saveImage(key: string, image: string): void {
    sessionStorage.setItem(key, image);
  }

  /**
   * Get image
   */
  getImage(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  /**
   * Remove image
   */
  removeImage(key: string): void {
    sessionStorage.removeItem(key);
  }

}
