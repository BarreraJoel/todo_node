"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectDto = void 0;
class SelectDto {
    constructor(cols, constraintsKey, constraintsValue) {
        this.cols = cols;
        this.constraintsKey = constraintsKey;
        this.constraintsValue = constraintsValue;
    }
}
exports.SelectDto = SelectDto;
