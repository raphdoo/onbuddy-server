import express, { Request, Response } from "express";
import { param } from "express-validator";
import { validateRequest } from "../../../middlewares/validate-request";
import ChecklistService from "./checklist.service";
import { currentUser } from "../../../middlewares/current-user";
import { NotFoundError } from "../../../errors/not-found-error";

const router = express.Router();

router.delete(
  "/:checklistId/delete-check/:checkId",
  [
    param("checklistId").notEmpty().withMessage("Checklist ID is required"),
    param("checkId").notEmpty().withMessage("Check ID is required"),
  ],
  validateRequest,
  currentUser,
  async (req: Request, res: Response) => {
    const { checklistId, checkId } = req.params;
    const currentUser = req.currentUser;

    const checklist = await ChecklistService.deleteCheck(
      {
        checklistId,
        checkId,
      },
      currentUser
    );

    if (!checklist) {
      throw new NotFoundError("Checklist not found!");
    }

    res.status(204).json();
  }
);

export { router as deleteCheckRouter };
