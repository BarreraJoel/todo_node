export class DeleteJobDto {


    constructor(
        public uuid: string,
        public user_uuid?: string,
        public name?: string,
    ) { }

}