import { Router } from "express";
import { issueController } from "./issue.controller";
import auth from "../../middleware/auth";


const router = Router();

router.post("/",auth(), issueController.createIssue);
// router.get("");
// router.get("");
// router.patch("");
// router.delete("");


export const issueRoute = router;