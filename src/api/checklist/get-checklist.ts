import express, { Request, Response } from "express";

import ChecklistService from "./checklist.service";

const router = express.Router();

router.get("/index", async (req: Request, res: Response) => {
  const checklist = await ChecklistService.findChecklist(
    req.currentUser?.companyId
  );

  res.status(200).send(checklist);
});

export { router as getChecklistRouter };
