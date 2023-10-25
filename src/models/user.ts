import mongoose from "mongoose";
import { Password } from "../utils/password";
import crypto from "crypto";
import { CompanyDoc } from "./company";

// An interface that describes the properties required to create a new user
export interface UserAttrs {
  firstname: string;
  lastname: string;
  companyId: string;
  email: string;
  password: string;
  bio?: string;
  manager?: string;
  programTrack?: string;
  checklistProgress?: number;
  role?: string;
  candidateType?: string;
  status?: string;
}

// An interface that describes the properties that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//An interface that describes the properties that a user document has
export interface UserDoc extends mongoose.Document {
  firstname: string;
  lastname: string;
  companyId: string;
  email: string;
  password: string;
  bio?: string;
  manager?: string;
  programTrack?: string;
  checklistProgress?: number;
  role?: string;
  candidateType?: string;
  status?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  getPasswordRestToken(): string;
}

export enum UserStatus {
  Active = "active",
  Deactivated = "deactivated",
}

export enum Roles {
  Employee = "employee",
  Admin = "admin",
}

export enum CandidateTypes {
  Interns = "interns",
  Graduate = "graduate",
  Experience = "experienced",
  NotProvided = "-",
}

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "-",
    },
    manager: {
      type: String,
      default: "-",
    },
    programTrack: {
      type: String,
      default: "-",
    },
    checklistProgress: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.Employee,
    },
    candidateType: {
      type: String,
      enum: Object.values(CandidateTypes),
      default: CandidateTypes.NotProvided,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.Active,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

//presave function to update to hashed password
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

//Generate password reset token
userSchema.methods.getPasswordRestToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hash and set resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //set Token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

//adding build method to mongoose userSchema object
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User };
