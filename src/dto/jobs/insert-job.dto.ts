import {v4 as uuidv4} from 'uuid';

export class InsertJobDto {

    public uuid: string;

    constructor(
        public user_uuid: string,
        public name: string,
    ) {
        this.uuid = uuidv4();        
    }

}