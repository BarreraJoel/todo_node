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
exports.DatabaseService = void 0;
const database_config_1 = require("../../config/database.config");
class DatabaseService {
    constructor() {
        this.initConnection();
    }
    initConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const mysql = require('mysql2/promise');
            this.connection = yield mysql.createConnection({
                host: database_config_1.db.host,
                user: database_config_1.db.user,
                database: database_config_1.db.database
            });
        });
    }
    // CRUD
    selectById(tableName, cols, id) {
        let stmt = `SELECT `;
        let colsString = "";
        for (let index = 0; index < cols.length; index++) {
            colsString += `${cols[index]}`;
            if (cols[index] != cols[cols.length - 1]) {
                colsString += ", ";
            }
        }
        stmt += `${cols} FROM ${tableName} WHERE id=?`;
        // console.log(stmt);
        return this.connection.execute(stmt, id);
    }
    selectByQuery(tableName, dto) {
        let stmt = `SELECT `;
        let cols = "";
        let constraints = "";
        let lastIndexCols = dto.cols.indexOf(dto.cols[dto.cols.length - 1]);
        let lastIndexConstraint = dto.constraintsKey.indexOf(dto.constraintsKey[dto.constraintsKey.length - 1]);
        dto.cols.forEach((col) => {
            cols += `${col}`;
            cols += dto.cols[lastIndexCols] == col ? "" : ", ";
        });
        dto.constraintsKey.forEach((constraint) => {
            constraints += `${constraint}=?`;
            constraints += dto.constraintsKey[lastIndexConstraint] == constraint ? "" : " AND ";
        });
        stmt += `${cols} FROM ${tableName} WHERE ${constraints}`;
        // console.log(stmt);
        return this.connection.execute(stmt, dto.constraintsValue);
    }
    selectOne(tableName, data) { }
    insert(tableName, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            let stmt = `INSERT INTO ${tableName} `;
            let cols = "";
            let values = "";
            let lastIndexCols = dto.cols.indexOf(dto.cols[dto.cols.length - 1]);
            let lastIndexValue = dto.values.indexOf(dto.values[dto.values.length - 1]);
            dto.cols.forEach((col) => {
                cols += `${col}`;
                cols += dto.cols[lastIndexCols] == col ? "" : ", ";
            });
            dto.values.forEach((value) => {
                values += "?";
                values += dto.values[lastIndexValue] == value ? "" : ", ";
            });
            stmt += `(${cols}) VALUES (${values})`;
            // console.log(stmt);
            return this.connection.execute(stmt, dto.values);
        });
    }
    update(tableName, data) { }
    delete(tableName, data) { }
    // TABLES
    checkTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            let stmt = `SHOW TABLES LIKE '${tableName}'`;
            const [rows] = yield this.connection.query(stmt);
            return rows.length > 0;
        });
    }
    createTable(dto) {
        let stmt = `CREATE TABLE ${dto.tableName} `;
        let lastIndexStructure = dto.structure.indexOf(dto.structure[dto.structure.length - 1]);
        let columns = "";
        let constraintsFinal = "";
        dto.structure.forEach((obj) => {
            let column = `${obj.column} ${obj.type}`;
            let constraints = "";
            if (obj.constraints) {
                obj.constraints.forEach((constraint) => {
                    switch (constraint) {
                        case "FK":
                            break;
                        case "PK":
                            constraints += "PRIMARY KEY ";
                            break;
                        default:
                            constraints += constraint + " ";
                            break;
                    }
                });
                if (obj.constraintFkValues) {
                    constraintsFinal += `, FOREIGN KEY (${obj.column}) REFERENCES ${obj.constraintFkValues.fkTable}(${obj.constraintFkValues.fkColumn})`;
                }
            }
            column += " " + constraints;
            column += dto.structure[lastIndexStructure] == obj ? "" : ", ";
            console.log(column);
            columns += column;
        });
        columns += constraintsFinal;
        stmt += `(${columns})`;
        console.log(stmt);
        this.connection.query(stmt);
    }
}
exports.DatabaseService = DatabaseService;
