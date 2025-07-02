export class ApiNotFoundException extends Error {
    constructor() {
        super("API não encontrada!");
    }
}