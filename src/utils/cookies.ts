import { Request, Response, NextFunction } from 'express';

function cookieExtractor(req: Request) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
}

function addTokenToHeader(req: Request, res: Response, next: NextFunction) {
    const token = cookieExtractor(req);
    if (token) {
        req.headers['authorization'] = `Bearer ${token}`;
    }
    next();
}

export { addTokenToHeader };
