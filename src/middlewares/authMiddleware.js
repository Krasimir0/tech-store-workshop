import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const auth = (req, res, next) => {
    const token = req.cookies.auth;

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        res.locals.user = decodedToken;
    } catch (err) {
        res.clearCookie('auth');
        return  res.redirect('/auth/login');
    }   
    next();
};

export const isAuth = (req,res,next) =>
    {
        if (!req.user) {
            res.redirect('/auth/login')
        }
        next();
    }

export const isGuest =  (req,res,next) => {
    if (req.user) {
        res.setError('You are already logged in!')
        return res.redirect('/')
    }
    next();
};