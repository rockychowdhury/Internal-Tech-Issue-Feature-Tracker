import type { Request, Response } from "express";
import { issueService } from "./issue.service";
import { ResponseMessages } from "../../constants";

const createIssue = async (req: Request, res: Response) => {
    // console.log(req.body);
    // console.log(req?.user);
    try {
        // console.log("from controller", req.user);
        
        const result = await issueService.createIssue({
                ...req.body,
                reporter_id: req?.user?.id,
            });
        // console.log(result);
        res.status(201).json(
            {
                success: true,
                message: "User Created successfully!",
                data: result.rows[0],
            }
        )
    } catch (error: any) {
        res.status(500).json(
            {
                success: false,
                message: error.message,
                error: error,
            }
        )
    }
};

const getAllIssue = async (req: Request, res: Response) => {
    try {
        const result = await issueService.getAllIssueFromDB();
        res.status(200).json({
            success: true,
            message: ResponseMessages.RETRIEVED_SUCCESS,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const getIssue = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await issueService.getIssueFromDB(id as string);
        if (!result) {
            res.status(404).json({
                success: false,
                message: ResponseMessages.NOT_FOUND,
                data: {},
            });
        }
        res.status(200).json({
            success: true,
            message: ResponseMessages.RETRIEVED_SUCCESS,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const updateIssue = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await issueService.updateIssueFromDB(req.body, id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: ResponseMessages.NOT_FOUND,
            });
        }

        // console.log(result);
        res.status(200).json({
            success: true,
            message: ResponseMessages.UPDATED_SUCCESS,
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};

const deleteIssue = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await issueService.deleteIssueFromDB(id as string);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: ResponseMessages.NOT_FOUND,
            });
        }

        res.status(200).json({
            success: true,
            message: ResponseMessages.DELETED_SUCCESS,
            data: {},
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error,
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