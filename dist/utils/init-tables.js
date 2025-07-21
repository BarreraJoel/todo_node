"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_table_dto_1 = require("../dto/db/create-table.dto");
const database_service_1 = require("../services/database/database.service");
const dbService = new database_service_1.DatabaseService();
function initTables() {
    return __awaiter(this, void 0, void 0, function* () {
        yield dbService.initConnection();
        yield initAuthTables();
        console.log('Tablas creadas');
        process.exit(0);
    });
}
;
function initAuthTables() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield dbService.checkTable('users'))) {
            dbService.createTable(new create_table_dto_1.CreateTableDto('users', [
                { column: 'uuid', type: 'varchar(100)', constraints: ["NOT NULL", "PK"] },
                { column: 'email', type: 'varchar(25)', constraints: ["NOT NULL", "UNIQUE"] },
                { column: 'password', type: 'varchar(150)', constraints: ["NOT NULL"] },
                { column: 'first_name', type: 'varchar(25)', constraints: ["NOT NULL"] },
                { column: 'last_name', type: 'varchar(25)', constraints: ["NOT NULL"] },
            ]));
        }
        if (!(yield dbService.checkTable('tokens'))) {
            dbService.createTable(new create_table_dto_1.CreateTableDto('tokens', [
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
    });
}
initTables();
