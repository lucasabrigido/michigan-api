import serverless from 'serverless-http';

import expressApp from '../app';
import upload, {routerFile} from '../api/upload/route';
import config from '../api/config';

const app = expressApp((_app) => {
    _app.use('/', upload);
    _app.use('/file', routerFile);
});

const serverlessHandler = serverless(app, {basePath: '/michigan-api/upload'});

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
