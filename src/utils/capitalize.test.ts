import { capitalizeString } from './capitalize';
import { describe, it, expect } from 'vitest';

describe('capitalizeString', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalizeString('hello')).toBe('Hello');
    expect(capitalizeString('world')).toBe('World');
    expect(capitalizeString('wOrld')).toBe('WOrld');
  });
});
