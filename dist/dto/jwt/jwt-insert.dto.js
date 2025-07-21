"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtInsertDto = void 0;
const uuid_1 = require("uuid");
class JwtInsertDto {
    constructor(user_uuid, token) {
        this.user_uuid = user_uuid;
        this.token = token;
        this.uuid = (0, uuid_1.v4)();
    }
}
exports.JwtInsertDto = JwtInsertDto;
