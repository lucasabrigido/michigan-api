const config = require('./src/api/config');

module.exports = ['dev', 'local', 'alpha', 'prod'].includes(config.stage)
    ? {
        client: 'sqlite3',
        connection: {
            filename: './src/api/db/michigan-db.sqlite3',
        },
        migrations: {
            directory: './migrations',
        },
    }
    : {
        client: 'mysql',
        connection: {
            host: config.host,
            database: config.database,
            user: config.user,
            password: config.password,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    };
