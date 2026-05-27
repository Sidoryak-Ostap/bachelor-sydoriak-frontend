import { formatDate, formattedShortDate, capitalizeFirstLetter } from './format';
import { describe, it, expect } from 'vitest';
describe('formatDate', () => {
  it('should format date in English locale', () => {
    expect(formatDate('2022-01-01', 'en')).toBe('January 1, 2022');
  });

  it('should format date in Ukrainian locale', () => {
    expect(formatDate('2022-01-01', 'uk')).toBe('1 січня 2022 р.');
  });
});

describe('formattedShortDate', () => {
  it('should format date in Ukrainian locale', () => {
    expect(formattedShortDate('2022-01-01', 'uk')).toBe('1 січня');
  });

  it('should format date in English locale', () => {
    expect(formattedShortDate('2022-01-01', 'en')).toBe('January 1');
  });
});

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('should not change other letters', () => {
    expect(capitalizeFirstLetter('wOrld')).toBe('WOrld');
  });

  it('should handle single word', () => {
    expect(capitalizeFirstLetter('world')).toBe('World');
  });
});
