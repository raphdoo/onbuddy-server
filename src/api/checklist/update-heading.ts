import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../../../middlewares/validate-request";
import ChecklistService from "./checklist.service";
import { currentUser } from "../../../middlewares/current-user";

const router = express.Router();

router.patch(
  "/:checklistId/update-heading",
  [
    param("checklistId").notEmpty().withMessage("Checklist ID is required"),
    body("newHeading").notEmpty().withMessage("Please provide a new heading"),
  ],
  validateRequest,
  currentUser,
  async (req: Request, res: Response) => {
    const { newHeading } = req.body;
    const { checklistId } = req.params;
    const currentUser = req.currentUser;

    const checklist = await ChecklistService.updateHeading(
      { checklistId, newHeading },
      currentUser
    );

    if (!checklist) {
      return res.status(404).json({ error: "Checklist not found" });
    }
  }
);

export { router as updateHeadingRouter };
