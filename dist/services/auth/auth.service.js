"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tsyringe_1 = require("tsyringe");
const insert_dto_1 = require("../../dto/db/insert.dto");
const select_dto_1 = require("../../dto/db/select.dto");
const bcryptjs_1 = require("bcryptjs");
const jwt_insert_dto_1 = require("../../dto/jwt/jwt-insert.dto");
let AuthService = (() => {
    let _classDecorators = [(0, tsyringe_1.autoInjectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var AuthService = _classThis = class {
        // private dbService: DatabaseService;
        // private jwtService: JwtService;
        constructor(dbService, jwtService) {
            this.dbService = dbService;
            this.jwtService = jwtService;
            // this.dbService = new DatabaseService();
        }
        login(dto) {
            return __awaiter(this, void 0, void 0, function* () {
                // await this.dbService.initConnection();
                const result = yield this.checkUserExists(dto.email);
                if (result.length == 0) {
                    return false;
                }
                if (!(yield this.checkPassword(result[0].password, dto.password))) {
                    throw new Error('La contraseña es inválida');
                }
                const token = this.jwtService.createToken(result[0]);
                const rows = yield this.jwtService.insert(new jwt_insert_dto_1.JwtInsertDto(result[0].uuid, token));
                // console.table(rows);
                // console.log(rows);
                return rows.affectedRows > 0 ? token : null;
            });
        }
        checkPassword(passwordHashed, passwordCheck) {
            return __awaiter(this, void 0, void 0, function* () {
                return (0, bcryptjs_1.compareSync)(passwordCheck, passwordHashed);
            });
        }
        checkUserExists(email) {
            return __awaiter(this, void 0, void 0, function* () {
                const [rows] = yield this.dbService.selectByQuery('users', new select_dto_1.SelectDto(['uuid', 'email', 'password'], ['email'], [email]));
                return rows;
            });
        }
        register(dto) {
            return __awaiter(this, void 0, void 0, function* () {
                const [rows] = yield this.dbService.insert('users', new insert_dto_1.InsertDto(['uuid', 'email', 'password', 'first_name', 'last_name'], [dto.uuid, dto.email, dto.password, dto.first_name, dto.last_name]));
                return rows.length > 0;
            });
        }
        user(token) {
            return __awaiter(this, void 0, void 0, function* () {
                const decoded = yield this.jwtService.check(token);
                return decoded.data;
            });
        }
    };
    __setFunctionName(_classThis, "AuthService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
})();
exports.AuthService = AuthService;
