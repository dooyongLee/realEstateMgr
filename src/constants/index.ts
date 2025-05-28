export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  PROPERTY: {
    BASE: '/properties',
    DETAIL: (id: string) => `/properties/${id}`,
  },
  CONTRACT: {
    BASE: '/contracts',
    DETAIL: (id: string) => `/contracts/${id}`,
  },
  CUSTOMER: {
    BASE: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
  },
  ADMIN: {
    BASE: '/admin',
    USERS: '/admin/users',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PROPERTY: {
    LIST: '/properties',
    NEW: '/properties/new',
    DETAIL: (id: string) => `/properties/${id}`,
  },
  CONTRACT: {
    LIST: '/contracts',
    DETAIL: (id: string) => `/contracts/${id}`,
  },
  CUSTOMER: {
    LIST: '/customers',
    DETAIL: (id: string) => `/customers/${id}`,
  },
  ADMIN: '/admin',
} as const;

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  SIZE: 10,
} as const;

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    'application/pdf': ['.pdf'],
  },
} as const; 