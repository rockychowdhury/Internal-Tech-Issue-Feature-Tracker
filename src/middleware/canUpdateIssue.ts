import type { NextFunction, Request, Response } from "express";
import { pool } from "../db";
import { ResponseMessages } from "../constants";
import sendResponse from "../utility/apiResponse";

const hasPermission = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req?.user;
            const { id } = req.params;

            if (user?.role == "maintainer") return next();

            const issueData = await pool.query(
                `
                SELECT * 
                FROM issues
                WHERE id=$1
                `,
                [id]
            );
            if (issueData.rows.length == 0) {
                return sendResponse(res, {
                    statusCode: 404,
                    success: false,
                    message: ResponseMessages.NOT_FOUND,
                });
            }
            const issue = issueData.rows[0];
            // console.log(issue);
            if (issue.status == "open" && issue.reporter_id == user?.id) return next();

            return sendResponse(res, {
                statusCode: 403,
                success: false,
                message: ResponseMessages.PERMISSION_DENIED,
            });

        } catch (error) {
            // console.log(error);
            next(error);
        }
    };
};

export default hasPermission;