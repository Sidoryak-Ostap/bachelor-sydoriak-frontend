import { describe, expect, it } from 'vitest';

import reducer, {
  clearSubscription,
  setSubscription,
  setSubscriptionStatus,
} from './subscriptionSlice';

describe('subscriptionSlice', () => {
  it('returns initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      subscriptionId: '',
      plan: 'starter',
      status: 'active',
      invoiceId: '',
      lastAmount: 0,
      nextPaymentDate: '',
      price: 0,
    });
  });

  it('setSubscription stores subscription data', () => {
    const payload = {
      subscriptionId: 'sub_123',
      plan: 'pro' as const,
      status: 'active' as const,
      invoiceId: 'inv_123',
      lastAmount: 2999,
      nextPaymentDate: '2026-06-01',
      price: 2999,
    };

    const state = reducer(undefined, setSubscription(payload));

    expect(state).toEqual(payload);
  });

  it('setSubscriptionStatus updates status only', () => {
    const existing = {
      subscriptionId: 'sub_123',
      plan: 'pro' as const,
      status: 'active' as const,
      invoiceId: 'inv_123',
      lastAmount: 2999,
      nextPaymentDate: '2026-06-01',
      price: 2999,
    };

    const state = reducer(existing, setSubscriptionStatus({ status: 'canceled' }));

    expect(state.status).toBe('canceled');
    expect(state.subscriptionId).toBe('sub_123');
    expect(state.plan).toBe('pro');
  });

  it('clearSubscription resets to defaults', () => {
    const existing = {
      subscriptionId: 'sub_123',
      plan: 'pro' as const,
      status: 'past_due' as const,
      invoiceId: 'inv_123',
      lastAmount: 2999,
      nextPaymentDate: '2026-06-01',
      price: 2999,
    };

    const state = reducer(existing, clearSubscription());

    expect(state).toEqual({
      subscriptionId: '',
      plan: 'starter',
      status: 'active',
      invoiceId: '',
      lastAmount: 0,
      nextPaymentDate: '',
      price: 0,
    });
  });
});
