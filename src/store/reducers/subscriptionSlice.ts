import { createSlice } from '@reduxjs/toolkit';

interface ISubscriptionState {
  subscriptionId: string;
  plan: 'basic' | 'pro' | 'starter';
  status: 'active' | 'canceled' | 'past_due' | 'expired';
  invoiceId: string;
  lastAmount: number;
  nextPaymentDate: string;
  price: number;
}

const initialState: ISubscriptionState = {
  subscriptionId: '',
  plan: 'starter',
  status: 'active',
  invoiceId: '',
  lastAmount: 0,
  nextPaymentDate: '',
  price: 0,
};

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscription: (state, action) => {
      state.subscriptionId = action.payload.subscriptionId;
      state.plan = action.payload.plan;
      state.status = action.payload.status;
      state.invoiceId = action.payload.invoiceId;
      state.lastAmount = action.payload.lastAmount;
      state.nextPaymentDate = action.payload.nextPaymentDate;
      state.price = action.payload.price;
    },
    setSubscriptionStatus: (state, action) => {
      state.status = action.payload.status;
    },
    clearSubscription: state => {
      state.subscriptionId = '';
      state.plan = 'starter';

      state.status = 'active';
      state.invoiceId = '';
      state.lastAmount = 0;
      state.nextPaymentDate = '';
      state.price = 0;
    },
  },
});

export const { setSubscription, clearSubscription, setSubscriptionStatus } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;
