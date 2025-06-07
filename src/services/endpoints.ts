export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
  },

  // Users
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
  },

  // Properties
  PROPERTIES: {
    BASE: '/properties',
    FEATURED: '/properties/featured',
    SEARCH: '/properties/search',
  },

  // Bookings
  BOOKINGS: {
    BASE: '/bookings',
    USER_BOOKINGS: '/bookings/user',
  },

  // Customers
  CUSTOMERS: {
    LIST: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
    CREATE: '/customers',
    UPDATE: (id: string) => `/customers/${id}`,
    DELETE: (id: string) => `/customers/${id}`,
  },

  // Reviews
  REVIEWS: {
    BASE: '/reviews',
    PROPERTY_REVIEWS: (propertyId: string) => `/reviews/property/${propertyId}`,
  },
} as const;
