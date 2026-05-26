import { describe, expect, it } from 'vitest';

import reducer, { changeField, setNdviActive } from './fieldMapSlice';

describe('fieldMapSlice', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      selectedFieldId: null,
      isNdviActive: false,
    });
  });

  it('changeField sets selected field and resets NDVI toggle', () => {
    const state = reducer(
      { selectedFieldId: 'field-0', isNdviActive: true },
      changeField('field-1')
    );

    expect(state).toEqual({
      selectedFieldId: 'field-1',
      isNdviActive: false,
    });
  });

  it('setNdviActive toggles NDVI mode', () => {
    const state = reducer(undefined, setNdviActive(true));

    expect(state.isNdviActive).toBe(true);
  });
});
