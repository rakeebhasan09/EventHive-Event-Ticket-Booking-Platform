class AppError extends Error {
    public statusCode: number;
    public status: string;
    public isOperational: boolean;

    constructor(message: string, statusCode: number) {
        // Call the parent Error class constructor
        super(message);

        this.statusCode = statusCode;

        // 4xx = fail, 5xx = error
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

        // Identify expected application errors
        this.isOperational = true;

        // Capture the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
