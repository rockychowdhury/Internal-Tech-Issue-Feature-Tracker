import { type Response } from "express";


type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
    errors?: any;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    const responseBody: any = {
        success: data.success,
        message: data.message,
    };

    if (data.success) {
        responseBody.data = data.data !== undefined ? data.data : null;
    } else {
        responseBody.errors = data.errors !== undefined ? data.errors : null;
    }

    res.status(data.statusCode).json(responseBody);
};

export default sendResponse;