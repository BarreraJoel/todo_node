import { AuthService } from "../services/auth/auth.service";
import { DatabaseService } from "../services/database/database.service";
import { JwtService } from "../services/auth/jwt.service";

(async () => {
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
})();
