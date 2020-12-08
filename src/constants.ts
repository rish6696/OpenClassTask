import { BASE_URL } from "./config";

export const production = 0;
export const staging = 1;
export const local = 2;

export const TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const DB_DATE_FORMAT = "YYYY-MM-DD";

export const AUTH_COOKIE_KEY = "AUTHORIZATION";

export const REGISTER_STORE_EMAIL_AUTHENTICATE_ROUTE = "/store/authenticate";

export const TOKEN_TYPES = {
  REGISTER_STORE_AUTHENTICATION_TOKEN_TYPE: 1,
  LOGIN_STORE_TOKEN_TYPE : 2
};

export const REGISTER_STORE_MAIL_INFO = {
  SUBJECT: "Welcome to Open Class",
  Text: (token: string): string => {
    return `${BASE_URL()}${REGISTER_STORE_EMAIL_AUTHENTICATE_ROUTE}?token=${encodeURIComponent(token)}`;
  },
};


