import type { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { ResponseMessages } from "../../constants";
import sendResponse from "../../utility/apiResponse";


const loginUser = async (req: Request, res: Response) => {
    try {
        const { user, accessToken } = await authService.loginUserIntoDB(req.body);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Login successful",
            data: {
                token: accessToken,
                user,
            }
        });

    } catch (error: any) {
        // console.log(error);
        sendResponse(res, {
            statusCode: 401,
            success: false,
            message: error.message,
            errors: error,
        });
    }
}


const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await authService.createUser(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: ResponseMessages.CREATED_SUCCESS,
            data: result.rows[0],
        });

    } catch (error) {
        next(error);
    }
}
export const authController = { loginUser, registerUser };