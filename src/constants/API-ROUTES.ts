export const API_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  AUTH: {
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
  FIELDS: {
    CREATE_FIELD: '/fields',
    GET_FIELDS: '/fields',
    GET_FIELD_BY_ID: (fieldId: string) => `/fields/field/${fieldId}`,
    DELETE_FIELD: (fieldId: string) => `/fields/field/${fieldId}`,
  },

  FIELD_ACTIVITY: {
    CREATE_ACTIVITY: '/field-activity',
    GET_FIELD_ACTIVITIES: (fieldId: string) => `/field-activity/${fieldId}`,
    DELETE_ACTIVITY: `/field-activity`,
  },
  PROFILE: {
    UPDATE: '/user/profile',
  },
  SETTINGS: {
    UPDATE: '/user/settings',
  },
  STATISTICS: {
    GET: '/statistics',
  },
  SUBSCRIPTION: {
    GET: '/subscription',
    CREATE: '/subscription/create',
    CANCEL: '/subscription/cancel',
  },
};
