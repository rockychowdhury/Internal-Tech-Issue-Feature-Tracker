import { Router } from "express";
import { issueController } from "./issue.controller";


const router = Router();

router.post("/",issueController.createIssue);
// router.get("");
// router.get("");
// router.patch("");
// router.delete("");


export const issueRoute = router;