import { CreateTableDto } from "../dto/db/create-table.dto";
import { DatabaseService } from "../services/database/database.service";

const dbService = new DatabaseService();

async function initTables() {
    await dbService.initConnection();
    await initAuthTables();

    console.log('Tablas creadas');
    process.exit(0);
};

async function initAuthTables() {
    if (! await dbService.checkTable('users')) {
        dbService.createTable(new CreateTableDto('users', [
            { column: 'uuid', type: 'varchar(100)', constraints: ["NOT NULL", "PK"] },
            { column: 'email', type: 'varchar(25)', constraints: ["NOT NULL", "UNIQUE"] },
            { column: 'password', type: 'varchar(150)', constraints: ["NOT NULL"] },
            { column: 'first_name', type: 'varchar(25)', constraints: ["NOT NULL"] },
            { column: 'last_name', type: 'varchar(25)', constraints: ["NOT NULL"] },
        ]));
    }

    if (! await dbService.checkTable('tokens')) {
        dbService.createTable(new CreateTableDto('tokens', [
            {
                column: 'uuid',
                type: 'varchar(100)',
                constraints: ["NOT NULL", "PK"]
            },
            {
                column: 'user_uuid',
                type: 'varchar(100)',
                constraints: ["NOT NULL", "FK"],
                constraintFkValues: {
                    fkTable: "users",
                    fkColumn: "uuid"
                }
            },
            {
                column: 'token',
                type: 'varchar(512)',
                constraints: ["NOT NULL", "UNIQUE"]
            },
        ]));
    }

}


initTables();