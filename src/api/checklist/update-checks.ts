import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../../../middlewares/validate-request";
import ChecklistService from "./checklist.service";
import { currentUser } from "../../../middlewares/current-user";
import { NotFoundError } from "../../../errors/not-found-error";

const router = express.Router();

router.patch(
  "/:checklistId/update-check/:checkId",
  [
    param("checklistId").notEmpty().withMessage("Checklist ID is required"),
    param("checkId").notEmpty().withMessage("Check ID is required"),
    body("isChecked").isBoolean().optional(),
    body("title").isString().optional(),
  ],
  validateRequest,
  currentUser,
  async (req: Request, res: Response) => {
    const { isChecked, title } = req.body;
    const { checklistId, checkId } = req.params;
    const currentUser = req.currentUser;

    const checklist = await ChecklistService.updateCheck(
      { checklistId, checkId, isChecked, title },
      currentUser
    );

    if (!checklist) {
      throw new NotFoundError("Checklist not found!");
    }

    res.status(200).json({ checklist });
  }
);

export { router as updateCheckRouter };
