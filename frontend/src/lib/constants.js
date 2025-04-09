export const HOST = import.meta.env.MODE === "development" ? import.meta.env.VITE_SERVER_URL : "/"
export const PRODUCTS = 'api/products'
export const GET_USER_INFO = 'api/auth/user/get-user-info'
export const LOGIN_ROUTE = `api/auth/user/login`
export const LOGOUT_ROUTE = `api/auth/user/logout`
export const REGISTER_ROUTE = `api/auth/user/register`
export const ADD_FEEDBACK = 'api/feedback'