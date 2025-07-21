export class SelectDto {

    constructor(
        public cols: string[],
        public constraintsKey: string[],
        public constraintsValue: string[]
    ) { }

}