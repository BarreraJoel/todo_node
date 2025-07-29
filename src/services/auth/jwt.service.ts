const jwtObj = require('jsonwebtoken');
import { autoInjectable } from "tsyringe";
import { jwt } from "../../config/jwt.config";
import { SelectDto } from "../../dto/db/select.dto";
import { DatabaseService } from "../database/database.service";
import { InsertJwtDto } from "../../dto/jwt/insert-jwt.dto";
import { InsertDto } from "../../dto/db/insert.dto";
import { UpdateJwtDto } from "../../dto/jwt/update-jwt.dto";
import { UpdateDto } from "../../dto/db/update.dto";

@autoInjectable()
export class JwtService {

    constructor(private dbService: DatabaseService) { }

    /**
     * Genera un token de JWT
     * @param data información que se guardará en el token
     * @param expiresIn expresado en minutos
     * @returns el token generado
     */
    public createToken(data: any, expiresIn?: number) {
        if (expiresIn) {
            return jwtObj.sign({
                exp: expiresIn ? Math.floor(Date.now() / 1000) + (expiresIn * 60) : 0,
                data: data
            }, jwt.secret);
        }

        return jwtObj.sign({
            data: data
        }, jwt.secret);
    }

    /**
     * 
     * @param token 
     * @returns 
     */
    public async check(token: string) {
        // console.log(token + "check");

        const decoded = jwtObj.verify(token, jwt.secret);
        return decoded ?? null;
    }

    /**
     * 
     * @param token 
     * @returns 
     */
    public async checkTokenExists(token: string) {
        const [rows] = await this.dbService.selectAll('tokens', new SelectDto(
            ['user_uuid', 'token'],
            [
                {
                    key: 'token', operation: '='
                }
            ],
            [token],
        ));

        return rows.length > 0;
    }

    /**
     * 
     * @param dto 
     * @returns 
     */
    public async insert(dto: InsertJwtDto) {
        const [rows] = await this.dbService.insert('tokens', new InsertDto(
            ['uuid', 'user_uuid', 'token', 'token_refresh'],
            [dto.uuid, dto.user_uuid, dto.token, dto.token_refresh]
        ));

        return rows;
    }

    public async update(dto: UpdateJwtDto) {
        const [rows] = await this.dbService.update('tokens', new UpdateDto(
            ['token'],
            [dto.jwt],
            [{ key: 'user_uuid', operation: "=" }],
            [dto.user_uuid]
        ));
        return rows.affectedRows > 0;
    }

    public async refresh(tokenRefresh: string) {
        const user = await this.check(tokenRefresh);
        console.log(user);
        
        if (user) {
            const token = this.createToken(user.data, 10);
            if (await this.update(new UpdateJwtDto(
                user.data.uuid, token
            ))) {
                return token;
            }
        }
        return false;
    }

}
