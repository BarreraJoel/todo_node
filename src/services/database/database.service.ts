import { db } from "../../config/database.config";
import { CreateTableDto } from "../../dto/db/create-table.dto";
import { SelectDto } from "../../dto/db/select.dto";
import { InsertDto } from "../../dto/db/insert.dto";
import { UpdateDto } from "../../dto/db/update.dto";
import { DeleteDto } from "../../dto/db/delete.dto";

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

    public async selectAll(tableName: string, dto: SelectDto) {
        let cols = "";
        let lastIndexCols = dto.cols.indexOf(dto.cols[dto.cols.length - 1]);

        dto.cols.forEach((col: string) => {
            cols += `${col}`;
            cols += dto.cols[lastIndexCols] == col ? "" : ", ";
        });
        let stmt = `SELECT ${cols} FROM ${tableName}`;

        if (dto.constraints) {
            let constraints = "";
            let lastIndexConstraint = dto.constraints.indexOf(dto.constraints[dto.constraints.length - 1]);

            dto.constraints.forEach((constraint) => {
                constraints += `${constraint.key}${constraint.operation}?`;
                constraints += dto.constraints?.[lastIndexConstraint] == constraint ? "" : " AND ";
            });
            stmt += ` WHERE ${constraints}`;
            return this.connection.execute(stmt, dto.constraintsValue);

        }

        return await this.connection.query(stmt);
    }

    public async insert(tableName: string, dto: InsertDto) {
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

        let stmt = `INSERT INTO ${tableName} (${cols}) VALUES (${values})`;

        return this.connection.execute(stmt, dto.values);
    }

    public update(tableName: string, dto: UpdateDto) {
        let updates = "";
        let lastIndexCols = dto.cols.indexOf(dto.cols[dto.cols.length - 1]);
        let constraints = "";
        let lastIndexConstraint = dto.constraints.indexOf(dto.constraints[dto.constraints.length - 1]);

        dto.cols.forEach((col) => {
            updates += `${col}=?`;
            updates += dto.cols[lastIndexCols] == col ? "" : ", ";
        });

        dto.constraints.forEach((constraint) => {
            constraints += `${constraint.key}${constraint.operation}?`;
            constraints += dto.constraints?.[lastIndexConstraint] == constraint ? "" : " AND ";
        });
        console.log(dto.values);
        console.log(dto.constraintsValue);
        
        let stmt = `UPDATE ${tableName} SET ${updates} WHERE ${constraints}`;
        console.log(stmt);
        
        return this.connection.execute(stmt, [...dto.values, ...dto.constraintsValue]);
    }

    public delete(tableName: string, dto: DeleteDto) {
        let constraints = "";
        let lastIndexConstraint = dto.constraints.indexOf(dto.constraints[dto.constraints.length - 1]);

        dto.constraints.forEach((constraint) => {
            constraints += `${constraint.key}${constraint.operation}?`;
            constraints += dto.constraints?.[lastIndexConstraint] == constraint ? "" : " AND ";
        });
        let stmt = `DELETE FROM ${tableName} WHERE ${constraints}`;

        return this.connection.execute(stmt, dto.constraintsValue);
    }

    // TABLES
    public async checkTable(tableName: string) {
        let stmt = `SHOW TABLES LIKE '${tableName}'`;
        const [rows] = await this.connection.query(stmt);

        return rows.length > 0;
    }

    public createTable(dto: CreateTableDto) {
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

            columns += column;
        });

        columns += constraintsFinal;
        let stmt = `CREATE TABLE ${dto.tableName} (${columns})`;
        
        this.connection.query(stmt);
    }

}