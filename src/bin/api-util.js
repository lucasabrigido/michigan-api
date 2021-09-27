import serverless from 'serverless-http';

import expressApp from '../app';
import docs from '../api/routes/doc';
import migration from '../api/routes/migration';
import config from '../api/config';

const app = expressApp((_app) => {
    if (['local', 'dev'].includes(config.stage)) {
        _app.use('/docs', docs);
    }
    // ToDo Colocar apiKey
    _app.use('/migration', migration);
});

const serverlessHandler = serverless(app, {basePath: '/michigan-api/util'});

export const handler = async (event, context) => {
    if (config.debug) {
        console.log(JSON.stringify({event}, null, 2));
        console.log(JSON.stringify({context}, null, 2));
    }

    const response = await serverlessHandler(event, context);

    if (config.debug) {
        console.log(JSON.stringify({response}, null, 2));
    }

    if (response.statusCode >= 500) {
        console.log('error -->');
        console.log(JSON.stringify({ event, context, response}, null, 2));
    }

    return response;
};
