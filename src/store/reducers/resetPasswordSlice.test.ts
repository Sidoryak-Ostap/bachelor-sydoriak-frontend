import { describe, expect, it } from 'vitest';

import reducer, { setResetPasswordCode, setResetPasswordEmaiil } from './resetPasswordSlice';

describe('resetPasswordSlice', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      email: null,
      code: null,
    });
  });

  it('setResetPasswordEmaiil stores email', () => {
    const state = reducer(undefined, setResetPasswordEmaiil('user@example.com'));

    expect(state.email).toBe('user@example.com');
    expect(state.code).toBeNull();
  });

  it('setResetPasswordCode stores code', () => {
    const state = reducer(undefined, setResetPasswordCode('123456'));

    expect(state.code).toBe('123456');
    expect(state.email).toBeNull();
  });
});
