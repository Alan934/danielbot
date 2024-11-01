"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZodMessages = void 0;
//Funcion que concatena los mesajes de error de las validaciones
function getZodMessages(data) {
    let output = "";
    for (let index = 0; index < data.length; index++) {
        output += data[index].message + ". ";
    }
    return output;
}
exports.getZodMessages = getZodMessages;
