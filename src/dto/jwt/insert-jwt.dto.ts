import { v4 as uuidv4 } from 'uuid';

export class InsertJwtDto {

    public uuid: string;

    constructor(
        public user_uuid: string,
        public token: string,
        public token_refresh: string,
    ) {
        this.uuid = uuidv4();
    }

}