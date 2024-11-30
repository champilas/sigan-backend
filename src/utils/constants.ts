//Default pagination numbers
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 50;
export const EXPIRE_TOKEN_TIME = '7d';
export const EXPIRE_COOKIE_TIME = 1000 * 60 * 60 * 24 * 7; // 7 days
export const NONCE_LENGTH = 10;
export const COOKIE_CONFIG = {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as 'none',
    expires: new Date(Date.now() + EXPIRE_COOKIE_TIME),
};