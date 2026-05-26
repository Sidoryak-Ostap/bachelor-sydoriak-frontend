import { beforeEach, describe, expect, it, vi } from 'vitest';

import reducer, { logout, setAuthLoading, setProfile, setSettings, setUser } from './userSlice';

describe('userSlice', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('returns initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      name: null,
      email: null,
      token: null,
      role: null,
      isAuthorized: false,
      isAuthLoading: true,
      profile: {
        phoneNumber: null,
        firstName: '',
        lastName: '',
        location: '',
        bio: '',
        avatarUrl: null,
      },
      settings: {
        language: 'uk',
        timezone: 'UTC',
        autoAreaCalculation: true,
        emailUpdates: false,
        weeklySummary: false,
        marketingNews: false,
      },
    });
  });

  it('setUser stores auth and merges profile/settings', () => {
    const state = reducer(
      undefined,
      setUser({
        name: 'Jane',
        email: 'jane@example.com',
        role: 'user',
        token: 'token-123',
        profile: {
          firstName: 'Jane',
          avatarUrl: 'https://example.com/avatar.png',
        },
        settings: {
          language: 'en',
          weeklySummary: true,
        },
      })
    );

    expect(state.name).toBe('Jane');
    expect(state.email).toBe('jane@example.com');
    expect(state.role).toBe('user');
    expect(state.token).toBe('token-123');
    expect(state.isAuthorized).toBe(true);
    expect(state.isAuthLoading).toBe(false);
    expect(state.profile.firstName).toBe('Jane');
    expect(state.profile.avatarUrl).toBe('https://example.com/avatar.png');
    expect(state.profile.lastName).toBe('');
    expect(state.settings.language).toBe('en');
    expect(state.settings.weeklySummary).toBe(true);
    expect(state.settings.timezone).toBe('UTC');
  });

  it('setProfile merges provided profile fields', () => {
    const base = reducer(undefined, {
      type: 'seed',
    });

    const state = reducer(
      base,
      setProfile({
        firstName: 'John',
        lastName: 'Doe',
      })
    );

    expect(state.profile.firstName).toBe('John');
    expect(state.profile.lastName).toBe('Doe');
    expect(state.profile.location).toBe('');
  });

  it('setSettings merges provided settings fields', () => {
    const state = reducer(
      undefined,
      setSettings({
        language: 'en',
        marketingNews: true,
      })
    );

    expect(state.settings.language).toBe('en');
    expect(state.settings.marketingNews).toBe(true);
    expect(state.settings.timezone).toBe('UTC');
  });

  it('setAuthLoading updates loading flag', () => {
    const state = reducer(undefined, setAuthLoading(false));

    expect(state.isAuthLoading).toBe(false);
  });

  it('logout clears user data, resets settings, and removes token from localStorage', () => {
    localStorage.setItem('accessToken', 'token-123');
    const removeSpy = vi.spyOn(Storage.prototype, 'removeItem');

    const authenticated = reducer(
      undefined,
      setUser({
        name: 'Jane',
        email: 'jane@example.com',
        role: 'user',
        token: 'token-123',
        profile: {
          firstName: 'Jane',
          lastName: 'Doe',
          location: 'Kyiv',
          bio: 'Bio',
          phoneNumber: '+123456789',
          avatarUrl: 'https://example.com/avatar.png',
        },
        settings: {
          language: 'en',
          timezone: 'Europe/Kyiv',
          autoAreaCalculation: false,
          emailUpdates: true,
          weeklySummary: true,
          marketingNews: true,
        },
      })
    );

    const state = reducer(authenticated, logout());

    expect(state.name).toBeNull();
    expect(state.email).toBeNull();
    expect(state.role).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthorized).toBe(false);
    expect(state.isAuthLoading).toBe(false);
    expect(state.profile).toEqual({
      firstName: null,
      lastName: null,
      location: null,
      bio: null,
      phoneNumber: null,
      avatarUrl: null,
    });
    expect(state.settings.timezone).toBe('UTC');
    expect(state.settings.autoAreaCalculation).toBe(true);
    expect(state.settings.emailUpdates).toBe(false);
    expect(state.settings.weeklySummary).toBe(false);
    expect(state.settings.marketingNews).toBe(false);
    expect(removeSpy).toHaveBeenCalledWith('accessToken');
  });
});
