import dotenv from "dotenv";
import app from "./app.js";
import { checkDatabaseConnection } from "./db-config/mysql-config.js";
import { consoleBox } from "./utils/common.js";
import { runMigrationScripts } from "./db-scripts/migrate.js";
dotenv.config();

const PORT = process.env.PORT || 3002;

const startServer = async () => {
   
    try {

         await checkDatabaseConnection();
         await runMigrationScripts();
       
          app.listen(PORT, () => {
            consoleBox(`🚀 Server running on port ${PORT} |  🌐 http://localhost:${PORT}`);
    });
    } catch (error) {
        consoleBox("❌ Application failed to start");
        console.error(error);
        process.exit(1);
    }
};

startServer();