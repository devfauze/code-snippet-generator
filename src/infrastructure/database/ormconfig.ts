import { DataSource } from 'typeorm';
import { Snippet } from '@domain/domain/Snippet';
import * as process from "node:process";
require('dotenv').config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'snippets_db',
    synchronize: true,
    logging: true,
    entities: [Snippet],
    migrations: ['src/infrastructure/database/migrations/**/*.ts'],
});

export default AppDataSource;
