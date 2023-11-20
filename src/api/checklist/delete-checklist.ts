import express, { Request, Response } from "express";
import { param } from "express-validator";
import { validateRequest } from "../../../middlewares/validate-request";
import ChecklistService from "./checklist.service";
import { currentUser } from "../../../middlewares/current-user";

const router = express.Router();

router.delete(
  "/:checklistId/delete",
  [param("checklistId").notEmpty().withMessage("Checklist ID is required")],
  validateRequest,
  currentUser,
  async (req: Request, res: Response) => {
    const { checklistId } = req.params;
    const currentUser = req.currentUser;

    const isDeleted = await ChecklistService.deleteChecklist(checklistId);

    if (!isDeleted) {
      return res.status(404).json({ error: "Checklist not found" });
    }

    res.status(204).json();
  }
);

export { router as deleteChecklistRouter };
