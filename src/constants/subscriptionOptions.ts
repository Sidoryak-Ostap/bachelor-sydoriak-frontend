export const enum SubscriptionPlanName {
  Starter = 'Starter',
  Basic = 'Basic',
  Pro = 'Pro',
}

export type SubscriptionPlan = {
  name: SubscriptionPlanName;
  description: string;
  regularPrice: number | string;
  pricePerYear: number | string;
  features: string[];
};

export const PLANS: SubscriptionPlan[] = [
  {
    name: SubscriptionPlanName.Starter,
    description: 'For those just getting started',
    regularPrice: 'Free',
    pricePerYear: 'Free',
    features: [
      'Manage up to 10 fields.',
      'Access to NDVI only.',
      'Community access.',
      '3 months of data history.',
    ],
  },
  {
    name: SubscriptionPlanName.Basic,
    description: 'For those looking to grow',
    pricePerYear: 99.99,
    regularPrice: 9.99,
    features: [
      'Manage up to 50 fields.',
      'Access to NDVI, EVI, NDMI and EVI,',
      'Priority support.',
      'Local 7-day hyper-local weather forecasts.',
      '12 months of data history.',
    ],
  },
  {
    name: SubscriptionPlanName.Pro,
    description: 'For those who want it all',
    regularPrice: 29.99,
    pricePerYear: 239.99,
    features: [
      'Manage more than 50 fields.',
      'Access to all indices.',
      '24/7 dedicated support.',
      '24 months of data history.',
      'Basic Yield Prediction powered by Machine Learning.',
    ],
  },
];
