import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import { ResponseMessages } from "../../constants";
import sendResponse from "../../utility/apiResponse";

const createIssue = async (req: Request, res: Response) => {
    try {
        const result = await issueService.createIssue({
            ...req.body,
            reporter_id: req?.user?.id,
        });
        
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: ResponseMessages.CREATED_SUCCESS,
            data: result.rows[0],
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            errors: error,
        });
    }
};

const getAllIssue = async (req: Request, res: Response) => {
    try {
        const { sort, type, status } = req.query;
        const result = await issueService.getAllIssueFromDB({
            sort: sort as string,
            type: type as string,
            status: status as string,
        });
        
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: ResponseMessages.RETRIEVED_SUCCESS,
            data: result,
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            errors: error,
        });
    }
};

const getIssue = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await issueService.getIssueFromDB(id as string);
        if (!result) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: ResponseMessages.NOT_FOUND,
            });
        }
        
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: ResponseMessages.RETRIEVED_SUCCESS,
            data: result,
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            errors: error,
        });
    }
};

const updateIssue = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    try {
        if (req.body.status !== undefined && user?.role !== "maintainer") {
            return sendResponse(res, {
                statusCode: 403,
                success: false,
                message: ResponseMessages.PERMISSION_DENIED,
            });
        }

        const result = await issueService.updateIssueFromDB(req.body, id as string);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: ResponseMessages.UPDATED_SUCCESS,
            data: result.rows[0],
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            errors: error,
        });
    }
};

const deleteIssue = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await issueService.deleteIssueFromDB(id as string);

        if (result.rowCount === 0) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: ResponseMessages.NOT_FOUND,
            });
        }

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: ResponseMessages.DELETED_SUCCESS,
            data: {},
        });
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            errors: error,
        });
    }
};

export const issueController = {
    createIssue,
    getAllIssue,
    getIssue,
    updateIssue,
    deleteIssue,
};