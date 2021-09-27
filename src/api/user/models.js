import Joi from '@hapi/joi';

export const SchemaCreateUpload = Joi.object().keys({
    name: Joi.string().trim().optional(),
});
