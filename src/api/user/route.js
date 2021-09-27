import express from 'express';
import {OK} from 'http-status-codes';

import {SchemaCreateUpload} from './models';
import Service from './service';
import config from '../config';
import validation from '../middlewares/validation';

const router = express.Router();

router.get('/', validation(SchemaCreateUpload), async(req, res) => {
    res.status(OK).send('ok');
    console.log(service);
});

const service = Service.config(config);

export default router;
