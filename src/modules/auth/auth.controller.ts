import type { Request, Response } from "express";
import { authService } from "./auth.service";
import { ResponseMessages } from "../../constants";


const loginUser = async (req: Request, res: Response) => {
    try {
        const { user, accessToken } = await authService.loginUserIntoDB(req.body);

        res.status(200).json({
            "success": true,
            "message": "Login successful",
            "data": {
                "token": accessToken,
                user,
            }
        })

    } catch (error: any) {
        // console.log(error);
        res.status(401).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}


const registerUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.createUser(req.body);
        res.send(result);
        res.status(201).send({
            success: true,
            message: ResponseMessages.CREATED_SUCCESS,
            data: result.rows[0],
        });

    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: error.message,
            error: error,
        });
    }
}
export const authController = { loginUser, registerUser };