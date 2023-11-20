import { BadRequestError } from "../../../errors/bad-request-error";
import {
  ChecklistItemAttrs,
  ChecklistItemDoc,
  ChecklistItem,
} from "../../models/checklist";
import { UserDoc } from "../../models/user";

class ChecklistService {
  static canModify = (currentUser: UserDoc, data: ChecklistItemAttrs) => {
    if (
      currentUser.role !== "admin" ||
      currentUser.companyId.toString() !== data.companyId.toString()
    ) {
      throw new BadRequestError("only admin can modify checklists!");
    }
  };
  static createChecklist = async (
    data: ChecklistItemAttrs,
    currentUser: UserDoc
  ) => {
    if (currentUser.role !== "admin") throw new BadRequestError("Bad request");
    data.companyId = currentUser.companyId;
    const checklist = ChecklistItem.build(data);
    await checklist.save();
    return checklist;
  };

  static findChecklist = async (companyId: string | undefined) => {
    return await ChecklistItem.find({ companyId });
  };

  static addCheck = async (
    checklistId: string,
    checkTitle: string,
    currentUser: UserDoc
  ): Promise<ChecklistItemDoc | null> => {
    const checklist = await ChecklistItem.findById(checklistId);
    if (!checklist) {
      return null;
    }
    this.canModify(currentUser, checklist);

    checklist.checks.push({ title: checkTitle });
    await checklist.save();
    return checklist;
  };

  static updateCheck = async (
    {
      checklistId,
      checkId,
      isChecked,
      title,
    }: {
      checklistId: string;
      checkId: string;
      isChecked?: boolean;
      title?: string;
    },
    currentUser: UserDoc
  ): Promise<ChecklistItemDoc | null> => {
    const checklist = await ChecklistItem.findById(checklistId);
    if (!checklist) {
      return null;
    }

    this.canModify(currentUser, checklist);
    const check = checklist.checks.find((c: any) => c.id === checkId);
    if (!check) {
      return null;
    }

    check.isChecked = isChecked;
    check.title = title ? title : check.title;
    await checklist.save();
    return checklist;
  };

  static deleteCheck = async (
    {
      checkId,
      checklistId,
    }: {
      checklistId: string;
      checkId: string;
    },
    currentUser: UserDoc
  ): Promise<ChecklistItemDoc | null> => {
    const checklist = await ChecklistItem.findById(checklistId);
    if (!checklist) {
      return null;
    }

    this.canModify(currentUser, checklist);

    const checkIndex = checklist.checks.findIndex((c: any) => c.id === checkId);
    if (checkIndex === -1) {
      return null;
    }

    checklist.checks.splice(checkIndex, 1);
    await checklist.save();
    return checklist;
  };

  static updateHeading = async (
    { checklistId, newHeading }: { checklistId: string; newHeading: string },
    currentUser: UserDoc
  ): Promise<ChecklistItemDoc | null> => {
    const checklist = await ChecklistItem.findById(checklistId);
    if (!checklist) {
      return null;
    }
    this.canModify(currentUser, checklist);

    checklist.heading = newHeading;
    await checklist.save();
    return checklist;
  };

  static deleteChecklist = async (checklistId: string): Promise<boolean> => {
    const result = await ChecklistItem.deleteOne({ _id: checklistId });
    return result.deletedCount !== 0;
  };
}

export default ChecklistService;
