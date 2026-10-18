import dotenv from 'dotenv';
dotenv.config();
import fs from 'node:fs';

function env(key) {
  return process.env[key];
}

const rdsSSL = {
  ca: fs.readFileSync(new URL('../../global-bundle.pem', import.meta.url)),
  rejectUnauthorized: true,
};

//Change Only Here For DB CREDENTIALS
export const DB_CREDIENTAILS_CONFIG = {
  DEV: {
    HOST: 'localhost',
    PORT: 3306,
    USERNAME: 'root',
    PASSWORD: 'Welcome@123',
    DATABASE: 'go_manage_app',
    ssl: false,
  },
  TEST: {
    HOST: env('APP_DB_HOST'),
    PORT: env('APP_DB_PORT'),
    USERNAME: env('APP_DB_USER'),
    PASSWORD: env('APP_DB_PASSWORD'),
    DATABASE: env('APP_DB_NAME'),
    ssl: {
      rejectUnauthorized: true,
    },
  },
  PROD: {
    HOST: env('APP_DB_HOST'),
    PORT: env('APP_DB_PORT'),
    USERNAME: env('APP_DB_USER'),
    PASSWORD: env('APP_DB_PASSWORD'),
    DATABASE: env('APP_DB_NAME'),
    ssl: rdsSSL,
  },
};
