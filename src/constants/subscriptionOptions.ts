export const enum SubscriptionPlanName {
  Starter = 'Starter',
  Basic = 'Basic',
  Pro = 'Pro',
}

export const SUBSCRIPTION_PLANS = [
  {
    value: 'Starter',
    label: 'general.plans.starter',
    price: 'Free',
  },
  {
    value: 'Basic',
    label: 'general.plans.basic',
    price: 8.99,
  },
  {
    value: 'Pro',
    label: 'general.plans.pro',
    price: 18.99,
  },
];

export type SubscriptionPlan = {
  nameKey?: SubscriptionPlanName;
  name: SubscriptionPlanName;
  description: string;
  regularPrice: number | string;
  pricePerYear: number | string;
  features: string[];
  button?: string;
};

export const PLANS: SubscriptionPlan[] = [
  {
    nameKey: SubscriptionPlanName.Starter,
    name: SubscriptionPlanName.Starter,
    description: 'For those just getting started',
    regularPrice: 'Free',
    pricePerYear: 'Free',
    features: ['Manage up to 10 fields.', 'Access to NDVI only.', '3 months of data history.'],
  },
  {
    nameKey: SubscriptionPlanName.Basic,
    name: SubscriptionPlanName.Basic,
    description: 'For those looking to grow',
    pricePerYear: 89.99,
    regularPrice: 8.99,
    features: [
      'Manage up to 20 fields.',
      'Access to NDVI, EVI, NDMI and EVI,',
      '24 months of data history.',
    ],
  },
  {
    nameKey: SubscriptionPlanName.Pro,
    name: SubscriptionPlanName.Pro,
    description: 'For those who want it all',
    regularPrice: 18.99,
    pricePerYear: 19.99,
    features: [
      'Manage more than 20 fields.',
      'Access to all indices.',
      'Local 7-day hyper-local weather forecasts.',
      'Unlimited access to data history.',
      'Yield prediction',
    ],
  },
];
