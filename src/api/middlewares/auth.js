import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import env from '../../config/env';
import {ForbiddenError, UnauthorizedError} from '../../utils/AppError';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new ForbiddenError('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, env.authConfig.secret);

        req.token = decoded;

        if (env.debug) {
            console.log('token: ', decoded);
        }

        next();
    } catch (err) {
        throw new UnauthorizedError();
    }
};
