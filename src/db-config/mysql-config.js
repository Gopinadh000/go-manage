import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { consoleBox } from "../utils/common.js";

import { DB_CREDIENTAILS_CONFIG } from "./db-data.js";

dotenv.config();

const getDBConfig = () => {

    const environment = process.env.APP_ENV || "DEV";

    const config = DB_CREDIENTAILS_CONFIG[environment];

    if (!config) {
        throw new Error(
            `Database configuration not found for environment: ${environment}`
        );
    }

    return {
        host: config.HOST,
        port: config.PORT,
        user: config.USERNAME,
        password: config.PASSWORD,
        database: config.DATABASE,
        ssl: config.ssl
    };
};

const dbConfig = getDBConfig();

const db = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const checkDatabaseConnection = async () => {
    try {
        const connection = await db.getConnection();
        const [rows] = await connection.query(`
            SELECT
                DATABASE() AS databaseName,
                VERSION() AS mysqlVersion
        `);

        connection.release();

        consoleBox("✅ MySQL connected successfully");
        consoleBox(`📦 Database: ${rows[0].databaseName} | 🛢️ MySQL Version: ${rows[0].mysqlVersion}`);

    } catch (error) {

        consoleBox("❌ MySQL connection failed" , error);

        throw error;
    }
};

const executeTransaction = async (callback) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const result = await callback(connection);
        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};



export {
    db,
    checkDatabaseConnection,
    executeTransaction
};