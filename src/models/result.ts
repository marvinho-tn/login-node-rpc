export default class Result {
    readonly success: boolean;
    readonly message: string;

    constructor(message: string, success: boolean) {
        this.message = message;
        this.success = success;
    }
}