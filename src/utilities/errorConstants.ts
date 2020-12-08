
export const EMAIL_NOT_EXISTS= "Email does not exists";
export const WRONG_PASSWORD = "Password is incorrect";
export const INVALID_REFRESH_TOKEN = "INVALID REFRESH TOKEN";
export const UNAUTHORIZED_REQUEST = "Access Denied, Please try with correct credentials";
export const REFRESH_TOKEN_EXPIRED = "REFRESH TOKEN EXPIRED";
export const INVALID_AUTH_TOKEN = "INVALID AUTH TOKEN";
export const NOT_FOUND = "NOT FOUND";
export const INVALID_HEADER_VALUE = "INVALID HEADERS VALUE";
export const INVALID_TOKEN = "INVALID TOKEN";
export const TOKEN_EXPIRED = "TOKEN EXPIRED";
export const INVALID_ID = "INVALID ID";
export const UNEXPECTED_ERROR="UNEXPECTED ERROR"
export const EMAIL_ALREADY_EXISTS="Email already exists"
export const INTERNAL_SERVER_ERROR="Something went wrong, try again after sometime"
export const LINK_EXPIRED="Link expired,Please try again"

export const ERROR_STATUS_CODE= {
    BAD_REQUEST_CODE: 400,
    INTERNAL_SERVER_ERROR_CODE : 500,
    UNAUTHORIZED_REQUEST_CODE: 401 
} 


export const generateError = (error:any) => {
    if(error.message && error.stack) {
        error = {message: error.message, stack: error.stack};
    }
    if(typeof(error) === "object") {
        error = JSON.stringify(error);
    }
    return error;
};