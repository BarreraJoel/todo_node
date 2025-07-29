import { autoInjectable } from "tsyringe";
import { InsertDto } from "../../dto/db/insert.dto";
import { SelectDto } from "../../dto/db/select.dto";
import { LoginDto } from "../../dto/auth/login.dto";
import { RegisterDto } from "../../dto/auth/register.dto";
import { DatabaseService } from "../database/database.service";
import { JwtService } from "./jwt.service";
import { compareSync } from "bcryptjs";
import { InsertJwtDto } from "../../dto/jwt/insert-jwt.dto";

@autoInjectable()
export class AuthService {

    constructor(
        private dbService: DatabaseService,
        private jwtService: JwtService,
    ) { }

    public async login(dto: LoginDto) {
        const user = await this.checkUserExists(dto.email);
        if (user.length == 0) {
            return false;
        }

        if (! await this.checkPassword(user[0].password, dto.password)) {
            throw new Error('La contraseña es inválida');
        }

        const token = this.jwtService.createToken(user[0], 10);
        const tokenRefresh = this.jwtService.createToken(user[0], 60 * 24);
        const rows = await this.jwtService.insert(new InsertJwtDto(user[0].uuid, token, tokenRefresh));

        return rows.affectedRows > 0 ? { jwt: token, jwtr: tokenRefresh } : null;
    }

    private async checkPassword(passwordHashed: string, passwordCheck: string) {
        return compareSync(passwordCheck, passwordHashed);
    }

    private async checkUserExists(email: string) {
        const [rows] = await this.dbService.selectAll('users', new SelectDto(
            ['uuid', 'email', 'password', 'first_name', 'last_name'],
            [{ key: 'email', operation: "=" }],
            [email],
        ));
        return rows;
    }

    public async register(dto: RegisterDto) {
        const [rows] = await this.dbService.insert('users', new InsertDto(
            ['uuid', 'email', 'password', 'first_name', 'last_name'],
            [dto.uuid, dto.email, dto.password, dto.first_name, dto.last_name]
        ));

        return rows.length > 0;
    }

    public async user(token: string) {
        const decoded = await this.jwtService.check(token);
        return decoded.data;
    }
}
