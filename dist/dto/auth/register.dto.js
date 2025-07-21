"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = void 0;
const bcryptjs_1 = require("bcryptjs");
const uuid_1 = require("uuid");
class RegisterDto {
    constructor(email, password, first_name, last_name) {
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = (0, bcryptjs_1.hashSync)(this.password);
        this.uuid = (0, uuid_1.v4)();
    }
}
exports.RegisterDto = RegisterDto;
