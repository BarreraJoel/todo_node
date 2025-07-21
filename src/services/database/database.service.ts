import { db } from "../../config/database.config";
import { CreateTableDto } from "../../dto/db/create-table.dto";
import { InsertDto } from "../../dto/db/insert.dto";
import { SelectDto } from "../../dto/db/select.dto";

export class DatabaseService {
    private connection: any;
    
    constructor() {
        this.initConnection();
    }

    public async initConnection() {
        const mysql = require('mysql2/promise');
        this.connection = await mysql.createConnection({
            host: db.host,
            user: db.user,
            database: db.database
        });
    }

    // CRUD
    public selectById(tableName: string, cols: string[], id: number) {
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

    public selectByQuery(tableName: string, dto: SelectDto) {
        let stmt = `SELECT `;

        let cols = "";
        let constraints = "";
        let lastIndexCols = dto.cols.indexOf(dto.cols[dto.cols.length - 1]);
        let lastIndexConstraint = dto.constraintsKey.indexOf(dto.constraintsKey[dto.constraintsKey.length - 1]);

        dto.cols.forEach((col: string) => {
            cols += `${col}`;
            cols += dto.cols[lastIndexCols] == col ? "" : ", ";
        });

        dto.constraintsKey.forEach((constraint: string) => {
            constraints += `${constraint}=?`;
            constraints += dto.constraintsKey[lastIndexConstraint] == constraint ? "" : " AND ";
        });

        stmt += `${cols} FROM ${tableName} WHERE ${constraints}`;
        // console.log(stmt);

        return this.connection.execute(stmt, dto.constraintsValue);
    }

    public selectOne(tableName: string, data: any) { }

    public async insert(tableName: string, dto: InsertDto) {
        let stmt = `INSERT INTO ${tableName} `;
        let cols = "";
        let values = "";
        let lastIndexCols = dto.cols.indexOf(dto.cols[dto.cols.length - 1]);
        let lastIndexValue = dto.values.indexOf(dto.values[dto.values.length - 1]);

        dto.cols.forEach((col: string) => {
            cols += `${col}`;
            cols += dto.cols[lastIndexCols] == col ? "" : ", ";
        });

        dto.values.forEach((value: string) => {
            values += "?";
            values += dto.values[lastIndexValue] == value ? "" : ", ";
        });

        stmt += `(${cols}) VALUES (${values})`;

        // console.log(stmt);

        return this.connection.execute(stmt, dto.values);
    }

    public update(tableName: string, data: any) { }
    public delete(tableName: string, data: any) { }

    // TABLES
    public async checkTable(tableName: string) {
        let stmt = `SHOW TABLES LIKE '${tableName}'`;
        const [rows] = await this.connection.query(stmt);

        return (rows as any[]).length > 0;
    }

    public createTable(dto: CreateTableDto) {
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