import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import { XMLParser , XMLValidator } from "fast-xml-parser";
import {db} from  "../db-config/mysql-config.js";
import { consoleBox } from "../utils/common.js";

dotenv.config();

const __fileName  =  fileURLToPath(import.meta.url);
const __dirName   = path.dirname(__fileName);

const AUTO_MIGRATE_DATABASE = process.env.AUTO_DB_MIGRATE ? process.env.AUTO_DB_MIGRATE.toLowerCase() === "true" : false;

console.log(AUTO_MIGRATE_DATABASE);

const XML_FILE = path.join(
    __dirName,
    "migrations-v1.xml"
);

const SQL_FILE = path.join(
    __dirName,
    "migrations-v1.sql"
);


const reaXMLFileAsStream = ()=> {
    return new Promise((resolve,  reject) => {
        try {

            let data ="";
            const stream = fs.createReadStream(XML_FILE);
            stream.on("data", (chunk) => {
                data += chunk.toString();
            });
            stream.on("end", () => {
                resolve(data);
            });
            stream.on("error", (error) => {
                reject(error);
            });
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};


const validateXMLFile =  (xmldata) => {
    const result =  XMLValidator.validate(xmldata);

    if (result !== true) {
        console.error("Migration XML validation failed");
        console.error(result);
        return false;
    }
    return true;
};


const parseXMLFile = (xmldata) =>{
    const parser  = new XMLParser({
        ignoreAttributes: false,
        trimValues: true
    });
    const json = parser.parse(xmldata);

    

    const jsonData =  json?.migrations["migration-script"];

    if (!jsonData) {
        return [];
    }
    
    if(jsonData.length > 0){
        return jsonData.map(item => {
            return {
                id: item["@_id"],
                name: item["@_name"],
                sql: item.sql
            }
        });
    }
   
    return jsonData
};


const checkMigrationTableExists = async ()=>{
    const query = `SHOW TABLES LIKE 'migration_history';`;
    const [rows] = await db.execute(query);
    return rows.length > 0;
}


const createMigrationTable = async () => {

    const query = `
        CREATE TABLE IF NOT EXISTS migration_history (
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            migration_id VARCHAR(50) NOT NULL,
            migrationname VARCHAR(255) NOT NULL,
            executed_at TIMESTAMP
                NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY uq_migration_id
                (migration_id)
        );
    `;
    await db.execute(query);
};


const getExecutedMigrations = async () => {

    const query = `
        SELECT
            migration_id,
            migrationname
        FROM migration_history
        ORDER BY id ASC;
    `;

    const [rows] =
        await db.execute(query);

    return rows;
};

const checkMigrationExecuted = (
    executedMigrations,
    migration
) => {

    return executedMigrations.some(
        (item) => {

            return (
                String(item.migration_id) ===
                    String(migration.id)
                &&
                item.migrationname ===
                    migration.name
            );

        }
    );
};


const appendSQLFile = async (
    migration
) => {

    const content = `-- Migration ${migration.id}: ${migration.name} ${migration.sql.trim()}`;

    
    await fs.promises.appendFile(
        SQL_FILE,
        content,
        "utf-8"
    );
};


const saveMigrationHistory = async (
    migration
) => {

    const query = `
        INSERT INTO migration_history
        (
            migration_id,
            migrationname
        )
        VALUES (?, ?);
    `;

    await db.execute(
        query,
        [
            migration.id,
            migration.name
        ]
    );
};


const executeMigration = async (
    migration
) => {

    const {
        id,
        name,
        sql
    } = migration;

    console.log(
        `Running migration script ${name} with id ${id}`
    );

    await db.execute(sql);

    await appendSQLFile(
        migration
    );

    await saveMigrationHistory(
        migration
    );

    console.log(
        `Migration ${id} completed`
    );
};


export const runMigrationScripts = async () => {

    if (!AUTO_MIGRATE_DATABASE) {

        console.log("AUTO_MIGRATE=false");
        console.log(
            "Migration execution skipped"
        );
        return;
    }


    const data =
        await reaXMLFileAsStream();


    const isValidXML =
        validateXMLFile(data);


    if (!isValidXML) {
        return;
    }


    const json =
        parseXMLFile(data);


    if (!json || json.length === 0) {

        console.log(
            "No migration scripts found"
        );

        return;
    }


    const migrationTableExists =
        await checkMigrationTableExists();


    if (!migrationTableExists) {

        consoleBox("Migration table does not exist");

        await createMigrationTable();


        consoleBox("Creating migration table...");
    }


    const executedMigrations =
        await getExecutedMigrations();

    for (const item of json) {

        const {
            id,
            name
        } = item;


        const alreadyExecuted =
            checkMigrationExecuted(
                executedMigrations,
                item
            );


        if (alreadyExecuted) {


            console.log(
                `Skipping migration ${id} - ${name}`
            );

            continue;
        }


        try {

            await executeMigration(
                item
            );

        } catch (error) {

            console.error(
                `Migration ${id} failed`
            );

            console.error(error);

            throw error;
        }
    }


    consoleBox("All migration scripts completed");
};




