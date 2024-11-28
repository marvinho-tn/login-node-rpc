export default class Result {
    readonly success: boolean;
    readonly message: string;

    constructor(message: string, success: boolean) {
        this.message = message;
        this.success = success;
    }

    static success(message: string): Result {
      return new Result(message, true);
    }
  
    static failure(message: string): Result {
      return new Result(message, false);
    }
}