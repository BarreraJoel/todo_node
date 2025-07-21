import { hashSync} from "bcryptjs";
import {v4 as uuidv4} from 'uuid';

export class RegisterDto {

    public uuid: string;

    constructor(
        public email: string,
        public password: string,
        public first_name: string,
        public last_name: string,
    ) {
        this.password = hashSync(this.password);
        this.uuid = uuidv4();        
    }

}