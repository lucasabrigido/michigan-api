import {ForbiddenError} from '../../utils/AppError';

function apiKey(...valid) {
    return (req, res, next) => {
        const apiKey = req.header('x-api-key');
        if (!valid.includes(apiKey)) {
            throw new ForbiddenError('API-KEY INVALIDA');
        }
        next();
    };
}

export default apiKey;
