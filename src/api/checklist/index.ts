import { Router } from "express";
import { createChecklistRouter } from "./create-checklist";
import { addCheckRouter } from "./add-checks";
import { updateCheckRouter } from "./update-checks";
import { deleteCheckRouter } from "./delete-check";
import { updateHeadingRouter } from "./update-heading";
import { deleteChecklistRouter } from "./delete-checklist";
import { getChecklistRouter } from "./get-checklist";

const checklistRouter = Router();

checklistRouter.use("/api/v1/checklist/", checklistRouter);

checklistRouter.use(createChecklistRouter);
checklistRouter.use(getChecklistRouter);
checklistRouter.use(addCheckRouter);
checklistRouter.use(updateCheckRouter);
checklistRouter.use(deleteCheckRouter);
checklistRouter.use(updateHeadingRouter);
checklistRouter.use(deleteChecklistRouter);

export default checklistRouter;
