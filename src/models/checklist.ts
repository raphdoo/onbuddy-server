import mongoose, { Types } from "mongoose";

interface SubCheck {
  title: string;
  isChecked?: boolean;
  users?: Types.ObjectId[];
}

// An interface that describes the properties required to create a new checklist item
export interface ChecklistItemAttrs {
  heading: string;
  companyId: string;
  checks: SubCheck[];
}

// An interface that describes the properties that a checklist item model has
interface ChecklistItemModel extends mongoose.Model<ChecklistItemDoc> {
  build(attrs: ChecklistItemAttrs): ChecklistItemDoc;
}

// An interface that describes the properties that a checklist item document has
export interface ChecklistItemDoc extends mongoose.Document {
  heading: string;
  companyId: string;
  checks: SubCheck[];
}

const subCheckSchema = new mongoose.Schema<SubCheck>(
  {
    title: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

const ChecklistItemSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    checks: [subCheckSchema],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamps: true,
  }
);

// Adding build method to mongoose checklist item schema object
ChecklistItemSchema.statics.build = (attrs: ChecklistItemAttrs) => {
  return new ChecklistItem(attrs);
};

const ChecklistItem = mongoose.model<ChecklistItemDoc, ChecklistItemModel>(
  "Checklist",
  ChecklistItemSchema
);

export { ChecklistItem };
