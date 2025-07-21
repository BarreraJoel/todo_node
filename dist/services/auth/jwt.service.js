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
exports.JwtService = void 0;
const jwtObj = require('jsonwebtoken');
const tsyringe_1 = require("tsyringe");
const jwt_config_1 = require("../../config/jwt.config");
const select_dto_1 = require("../../dto/db/select.dto");
const insert_dto_1 = require("../../dto/db/insert.dto");
let JwtService = (() => {
    let _classDecorators = [(0, tsyringe_1.autoInjectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var JwtService = _classThis = class {
        constructor(dbService) {
            this.dbService = dbService;
        }
        /**
         * Genera un token de JWT
         * @param data información que se guardará en el token
         * @param expiresIn expresado en segundos
         * @returns el token generado
         */
        createToken(data, expiresIn) {
            if (expiresIn) {
                return jwtObj.sign({
                    exp: expiresIn ? Math.floor(Date.now() / 1000) + (expiresIn * 60) : 0,
                    data: data
                }, jwt_config_1.jwt.secret);
            }
            return jwtObj.sign({
                data: data
            }, jwt_config_1.jwt.secret);
        }
        /**
         *
         * @param token
         * @returns
         */
        check(token) {
            return __awaiter(this, void 0, void 0, function* () {
                const decoded = jwtObj.verify(token, jwt_config_1.jwt.secret);
                return decoded !== null && decoded !== void 0 ? decoded : null;
            });
        }
        /**
         *
         * @param token
         * @returns
         */
        checkTokenExists(token) {
            return __awaiter(this, void 0, void 0, function* () {
                const [rows] = yield this.dbService.selectByQuery('tokens', new select_dto_1.SelectDto(['user_uuid', 'token'], ['token'], [token]));
                return rows.length > 0;
            });
        }
        /**
         *
         * @param dto
         * @returns
         */
        insert(dto) {
            return __awaiter(this, void 0, void 0, function* () {
                const [rows] = yield this.dbService.insert('tokens', new insert_dto_1.InsertDto(['uuid', 'user_uuid', 'token'], [dto.uuid, dto.user_uuid, dto.token]));
                return rows;
            });
        }
    };
    __setFunctionName(_classThis, "JwtService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        JwtService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return JwtService = _classThis;
})();
exports.JwtService = JwtService;
