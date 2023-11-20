import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../../../middlewares/validate-request";
import ChecklistService from "./checklist.service";
import { currentUser } from "../../../middlewares/current-user";
import { NotFoundError } from "../../../errors/not-found-error";

const router = express.Router();

router.post(
  "/:checklistId/add-check",
  [
    param("checklistId").notEmpty().withMessage("Checklist ID is required"),
    body("title")
      .notEmpty()
      .withMessage("Please provide a title for the check"),
  ],
  validateRequest,
  currentUser,
  async (req: Request, res: Response) => {
    const { title } = req.body;
    const { checklistId } = req.params;
    const currentUser = req.currentUser;

    const checklist = await ChecklistService.addCheck(
      checklistId,
      title,
      currentUser
    );

    if (!checklist) {
      throw new NotFoundError("Checklist not found!");
    }

    res.status(201).json({ checklist });
  }
);

export { router as addCheckRouter };
