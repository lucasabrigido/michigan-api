import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import config from './api/config';
import exceptions from './api/middlewares/exceptions';
import unknownRoute from './api/middlewares/unknown-route';
import noCacheControl from './api/middlewares/no-cache-control';
import normalizeLanguage from './api/middlewares/normalize-language';

import 'express-async-errors';

export default function expressApp(configRoutes) {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(noCacheControl);
    app.use(normalizeLanguage);

    configRoutes(app);

    app.use(unknownRoute);
    app.use(exceptions(config.debug));

    return app;
}
