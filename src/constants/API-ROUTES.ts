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
    PREDICT_YIELD: (fieldId: string) => `/yield-prediction/predict/${fieldId}`,
  },

  INDICES: {
    GET_INDICES: (fieldId: string) => `sentinel/field-indices/${fieldId}`,
  },

  FIELD_IMAGES: {
    GET_FIELD_IMAGES: (fieldId: string) => `sentinel/field-map/${fieldId}`,
  },

  FIELD_ACTIVITY: {
    CREATE_ACTIVITY: '/field-activity',
    GET_FIELD_ACTIVITIES: (fieldId: string) => `/field-activity/${fieldId}`,
    DELETE_ACTIVITY: `/field-activity`,
  },
  FIELD_REPORT: {
    GET: (fieldId: string) => `/ai-analysis-report/${fieldId}`,
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
  WEATHER: {
    GET_CURRENT_WEATHER: (fieldId: string) => `/weather/field/${fieldId}`,
  },
};
