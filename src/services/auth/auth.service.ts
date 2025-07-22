import { autoInjectable } from "tsyringe";
import { InsertDto } from "../../dto/db/insert.dto";
import { SelectDto } from "../../dto/db/select.dto";
import { LoginDto } from "../../dto/auth/login.dto";
import { RegisterDto } from "../../dto/auth/register.dto";
import { DatabaseService } from "../database/database.service";
import { JwtService } from "./jwt.service";
import { compareSync } from "bcryptjs";
import { JwtInsertDto } from "../../dto/jwt/jwt-insert.dto";

@autoInjectable()
export class AuthService {

    constructor(
        private dbService: DatabaseService,
        private jwtService: JwtService,
    ) { }

    public async login(dto: LoginDto) {
        const result = await this.checkUserExists(dto.email);
        if (result.length == 0) {
            return false;
        }

        if (! await this.checkPassword(result[0].password, dto.password)) {
            throw new Error('La contraseña es inválida');
        }

        const token = this.jwtService.createToken(result[0]);
        const rows = await this.jwtService.insert(new JwtInsertDto(result[0].uuid, token));

        return rows.affectedRows > 0 ? token : null;
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
