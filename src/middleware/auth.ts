import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { ROLE } from "../@types";
import { ResponseMessages } from "../constants";
import sendResponse from "../utility/apiResponse";

const auth = (...roles: ROLE[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // console.log(roles);
        try {
            const token = req.headers.authorization;
            // console.log(token);
            if (!token) {
                return sendResponse(res, {
                    statusCode: 401,
                    success: false,
                    message: ResponseMessages.TOKEN_INVALID,
                });
            }

            const decoded = jwt.verify(
                token as string,
                config.secret as string,
            ) as JwtPayload;

            const userData = await pool.query(
                `
                SELECT * FROM users WHERE email=$1   
                `,
                [decoded.email],
            );

            // console.log(userData);

            if (userData.rows.length === 0) {
                return sendResponse(res, {
                    statusCode: 404,
                    success: false,
                    message: ResponseMessages.NOT_FOUND,
                });
            }

            const user = userData.rows[0];

            // console.log(user);

            if (roles.length && !roles.includes(user.role)) {
                return sendResponse(res, {
                    statusCode: 403,
                    success: false,
                    message: ResponseMessages.UNAUTHORIZED,
                });
            }
            req.user = decoded;
            next();

        } catch (error) {
            // console.log(error);
            next(error);
        }
    };
};

export default auth;