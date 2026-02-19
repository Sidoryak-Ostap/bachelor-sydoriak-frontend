export const API_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  AUTH: {},
  FIELDS: {
    CREATE_FIELD: '/fields',
    GET_FIELDS: '/fields',
    GET_FIELD_BY_ID: (fieldId: string) => `/fields/field/${fieldId}`,
  },
};
