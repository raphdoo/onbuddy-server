import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../../middlewares/validate-request";
import ChecklistService from "./checklist.service";
import { currentUser } from "../../../middlewares/current-user";
import { ChecklistItemAttrs } from "../../models/checklist";

const router = express.Router();

router.post(
  "/create",
  [
    body("heading").notEmpty().withMessage("Please provide an heading"),
    body("companyId").notEmpty().withMessage("Please provide a companyId"),
  ],
  validateRequest,
  currentUser,
  async (req: Request, res: Response) => {
    const { heading, companyId } = req.body;
    const currentUser = req.currentUser;

    const data: ChecklistItemAttrs = {
      heading,
      companyId,
      checks: [{ title: "Get Started" }],
    };

    const checklist = await ChecklistService.createChecklist(data, currentUser);
    res.status(201).json({ checklist });
  }
);

export { router as createChecklistRouter };
