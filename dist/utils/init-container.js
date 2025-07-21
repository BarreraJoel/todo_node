"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
(() => __awaiter(void 0, void 0, void 0, function* () {
    // const dbService = new DatabaseService();
    // await dbService.initConnection();
    // const jwtService = new JwtService(dbService);
    // const authService = new AuthService(dbService, jwtService);
    // Container.set('db', dbService);
    // Container.set('jwt', new JwtService(dbService));
    // Container.set('jwt', jwtService);
    // Container.set('auth', new AuthService(Container.get('db'), Container.get('jwt')));
    // Container.set('auth', authService);
    // console.log(Container.get<AuthService>('auth'));
}))();
