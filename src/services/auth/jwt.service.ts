const jwtObj = require('jsonwebtoken');
import { autoInjectable } from "tsyringe";
import { jwt } from "../../config/jwt.config";
import { SelectDto } from "../../dto/db/select.dto";
import { DatabaseService } from "../database/database.service";
import { JwtInsertDto } from "../../dto/jwt/jwt-insert.dto";
import { InsertDto } from "../../dto/db/insert.dto";

@autoInjectable()
export class JwtService {

    constructor(private dbService: DatabaseService) { }

    /**
     * Genera un token de JWT
     * @param data información que se guardará en el token
     * @param expiresIn expresado en segundos
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
        const decoded = jwtObj.verify(token, jwt.secret);
        return decoded ?? null;
    }

    /**
     * 
     * @param token 
     * @returns 
     */
    public async checkTokenExists(token: string) {
        const [rows] = await this.dbService.selectByQuery('tokens', new SelectDto(
            ['user_uuid', 'token'], ['token'], [token],
        ));

        return rows.length > 0;
    }

    /**
     * 
     * @param dto 
     * @returns 
     */
    public async insert(dto: JwtInsertDto) {
        const [rows] = await this.dbService.insert('tokens', new InsertDto(
            ['uuid', 'user_uuid', 'token'],
            [dto.uuid, dto.user_uuid, dto.token]
        ));

        return rows;
    }


}
