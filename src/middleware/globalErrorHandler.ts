import type { NextFunction, Request, Response } from "express";
import { ResponseMessages } from "../constants";
import sendResponse from "../utility/apiResponse";

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err.code === "23505") {
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: ResponseMessages.USER_ALREADY_EXISTS,
            errors: err,
        });
    }
    if (err.name == "JsonWebTokenError" || err.name == "TokenExpiredError") {
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: ResponseMessages.TOKEN_INVALID,
            errors: err,
        });
    }

    return sendResponse(res, {
        statusCode: err?.statusCode ?? 500,
        success: false,
        message: err?.message || ResponseMessages.SERVER_ERROR,
        errors: err,
    });
};