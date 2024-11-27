export default class Result {
    success: boolean;
    message: string;

    constructor(message: string, success: boolean) {
        this.message = message;
        this.success = success;
    }
}