export const ROUTES = {
  login: '/auth/login',
  signup: '/auth/signup',
  dashboard: {
    settings: '/dashboard/settings',
    home: '/dashboard',
    pricing: '/dashboard/pricing',
    faq: '/dashboard/faq',
    profile: '/dashboard/profile',
    profileEdit: '/dashboard/profile/edit',
    fields: '/dashboard/fields',
    fieldDetails: (id: string) => `/dashboard/fields/${id}`,

    map: '/dashboard/map',
    mapField: (id: string) => `/dashboard/map/${id}`,
  },
  resetPassword: '/auth/password-recovery',
};
