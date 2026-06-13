import { Router } from "express";
import { issueController } from "./issue.controller";
import auth from "../../middleware/auth";
import hasPermission from "../../middleware/canUpdateIssue";
import { validateCreateIssue, validateUpdateIssue } from "../../middleware/validate";


const router = Router();

router.post("/", auth("maintainer", "contributor"), validateCreateIssue, issueController.createIssue);
router.get("/", issueController.getAllIssue);
router.get("/:id", issueController.getIssue);
router.patch("/:id", auth("contributor", "maintainer"), hasPermission(), validateUpdateIssue, issueController.updateIssue);
router.delete("/:id", auth("maintainer"), issueController.deleteIssue);


export const issueRoute = router;