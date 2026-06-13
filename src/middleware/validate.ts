import type { Request, Response, NextFunction } from "express";
import sendResponse from "../utility/apiResponse";

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim() === "") {
        errors.push("Name must be provided as a non-empty string");
    }
    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
        errors.push("A valid email address must be provided");
    }
    if (!password || typeof password !== "string" || password.trim() === "") {
        errors.push("Password must be provided");
    }
    if (role && role !== "contributor" && role !== "maintainer") {
        errors.push("Role must be either 'contributor' or 'maintainer'");
    }

    if (errors.length > 0) {
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Validation failed",
            errors: errors.join(", ")
        });
    }
    next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const errors: string[] = [];

    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
        errors.push("A valid email address must be provided");
    }
    if (!password || typeof password !== "string" || password.trim() === "") {
        errors.push("Password must be provided");
    }

    if (errors.length > 0) {
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Validation failed",
            errors: errors.join(", ")
        });
    }
    next();
};

export const validateCreateIssue = (req: Request, res: Response, next: NextFunction) => {
    const { title, description, type } = req.body;
    const errors: string[] = [];

    if (!title || typeof title !== "string" || title.trim() === "") {
        errors.push("Title is required");
    } else if (title.length > 150) {
        errors.push("Title must be at most 150 characters long");
    }

    if (!description || typeof description !== "string") {
        errors.push("Description is required");
    } else if (description.length < 20) {
        errors.push("Description must be at least 20 characters long");
    }

    if (!type || (type !== "bug" && type !== "feature_request")) {
        errors.push("Type must be either 'bug' or 'feature_request'");
    }

    if (errors.length > 0) {
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Validation failed",
            errors: errors.join(", ")
        });
    }
    next();
};

export const validateUpdateIssue = (req: Request, res: Response, next: NextFunction) => {
    const { title, description, type, status } = req.body;
    const errors: string[] = [];

    if (title !== undefined) {
        if (typeof title !== "string" || title.trim() === "") {
            errors.push("Title cannot be empty");
        } else if (title.length > 150) {
            errors.push("Title must be at most 150 characters long");
        }
    }

    if (description !== undefined) {
        if (typeof description !== "string") {
            errors.push("Description must be a string");
        } else if (description.length < 20) {
            errors.push("Description must be at least 20 characters long");
        }
    }

    if (type !== undefined && type !== "bug" && type !== "feature_request") {
        errors.push("Type must be either 'bug' or 'feature_request'");
    }

    if (status !== undefined && status !== "open" && status !== "in_progress" && status !== "resolved") {
        errors.push("Status must be one of: 'open', 'in_progress', 'resolved'");
    }

    if (errors.length > 0) {
        return sendResponse(res, {
            statusCode: 400,
            success: false,
            message: "Validation failed",
            errors: errors.join(", ")
        });
    }
    next();
};
