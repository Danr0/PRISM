const {SnakeNamingStrategy} = require("typeorm-naming-strategies");

module.exports = {
    type: 'postgres',
    host: (process.env.docker === 'TRUE' ? process.env.DB_ALIAS : process.env.POSTGRES_HOST),
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    logging: false,
    entities: [
        'src/**/entities/*.entity.ts'
    ],
    migrations: [
        'src/**/entities/migrations/*.ts'
    ],
    namingStrategy: new SnakeNamingStrategy()
}