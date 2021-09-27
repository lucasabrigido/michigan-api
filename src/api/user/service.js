import {v4 as uuid} from 'uuid';

import Repository from './repository';

export default class Service {
    static config(cfg) {
        return new Service(
            Repository.config(cfg),
        );
    }

    async add(item) {
        const now = new Date().toISOString();
        return await this._repository.put({
            // ...defaultProps,
            ...item,
            id: uuid(),
            createdAt: now,
            updateAt: now,
        });
    }

    constructor(repository) {
        this._repository = repository;
    }
}
