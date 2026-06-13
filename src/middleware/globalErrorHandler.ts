import type { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err.code === "23505") {
        return res.status(400).json({
            success: false,
            message: "Email already exists",
            error:err
        });
    }

    return res.status(err?.statusCode??500).json({
        success: false,
        message: "Internal Server Error",
        error: err,
    });
};