export class AccessDeniedException extends Error {
    constructor() {
        super("Acesso negado!");
    }
}