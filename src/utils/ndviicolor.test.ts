import { getNDVIColor } from './ndvicolor';
import { describe, it, expect } from 'vitest';

describe('getNDVIColor', () => {
  it('should return correct color for NDVI values', () => {
    expect(getNDVIColor(0.1)).toBe('#FF0000');
    expect(getNDVIColor(0.3)).toBe('#FFA500');
    expect(getNDVIColor(0.5)).toBe('#FFFF00');
    expect(getNDVIColor(0.7)).toBe('#ADFF2F');
    expect(getNDVIColor(0.9)).toBe('#008000');
  });
});
