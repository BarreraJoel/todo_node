export class UpdateJwtDto {

    constructor(
        public user_uuid: string,
        public jwt: string,
        public jwtr?: string,
        public uuid?: string,
    ) { }

}