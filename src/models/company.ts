import mongoose from 'mongoose';

// An interface that describes the properties required to create a new user
interface CompanyAttrs {
  companyName: string;
  email: string;
  pricing: string;
  status?: string;
}

// An interface that describes the properties that a user model has
interface CompanyModel extends mongoose.Model<CompanyDoc> {
  build(attrs: CompanyAttrs): CompanyDoc;
}

//An interface that describes the properties that a user document has
interface CompanyDoc extends mongoose.Document {
  companyName: string;
  email: string;
  pricing: string;
  status?: string;
}

export enum pricingPlan {
  Free = 'free',
  Pro = 'pro',
}

export enum Status {
  Active = 'active',
  Deactivated = 'deactivated',
}

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pricing: {
      type: String,
      enum: Object.values(pricingPlan),
      default: pricingPlan.Free,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.Active,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

//adding build method to mongoose userSchema object
companySchema.statics.build = (attrs: CompanyAttrs) => {
  return new Company(attrs);
};

const Company = mongoose.model<CompanyDoc, CompanyModel>(
  'Company',
  companySchema
);

const buildCompany = (attrs: CompanyAttrs) => {
  return new Company(attrs);
};

export { Company };
