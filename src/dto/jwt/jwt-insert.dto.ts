import { v4 as uuidv4 } from 'uuid';

export class JwtInsertDto {

    public uuid: string;

    constructor(
        public user_uuid: string,
        public token: string,
    ) {
        this.uuid = uuidv4();
    }

}