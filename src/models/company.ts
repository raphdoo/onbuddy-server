import mongoose from 'mongoose';

// An interface that describes the properties required to create a new user
interface CompanyAttrs {
  companyName: string;
  email: string;
  pricing: string;
  status?: string;
  ourBusiness?: string;
  ourPurpose?: string;
  ourValues?: string;
  diversityStatemet?: string;
  diversityStatement_url?: string;
}

// An interface that describes the properties that a user model has
interface CompanyModel extends mongoose.Model<CompanyDoc> {
  build(attrs: CompanyAttrs): CompanyDoc;
}

//An interface that describes the properties that a user document has
export interface CompanyDoc extends mongoose.Document {
  companyName: string;
  email: string;
  pricing: string;
  status?: string;
  ourBusiness?: string;
  ourPurpose?: string;
  ourValues?: string;
  diversityStatemet?: string;
  diversityStatement_url?: string;
}

export enum pricingPlan {
  Free = 'Standard',
  Pro = 'Pro',
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
    ourBusiness: {
      type: String,
      default:
        "It's exciting to have you join us. We have a clear vision to help you you make a difference and live an impactful life. We are on the way of becoming the organization with a difference and are excited about your future with us. Our Services: We are a customer-centered organisation and we make sure make sure all teams are supported needed to do their jobs well and provide excellent servies for our customers. Our Leadership: Our leadership is responsible for managing operational and strategic needs of the buisness; reviewing current risk appetite and preparing the organisation for the future. They are responsible for Our business strategy, Shareholder wealth, sustainabilty and development of company culture and values",
    },
    ourPurpose: {
      type: String,
      default:
        'We are strongly guided by our purpose as it underpins every decision. Our purpose is to empower individuals and communities by providing innovative solutions that enhance everyday life. Through a commitment to sustainability, integrity, and excellence, we aim to foster a more connected and sustainable world, where our products and services inspire positive change and create lasting value for our customers, employees, and stakeholders',
    },
    ourValues: {
      type: String,
      default:
        'Welcome to [Company Name], where we believe in the power of innovation and integrity to drive positive change. As a leading [industry/sector] company, we are dedicated to delivering cutting-edge solutions that not only meet the needs of our customers but also contribute to a more sustainable and interconnected world. Our commitment to excellence, collaboration, and customer satisfaction forms the foundation of our values, guiding us as we navigate the dynamic landscape of [industry/sector] with adaptability and a customer-centric approach. At [Company Name], we are not just building a business; we are fostering a community that values diversity, inclusivity, and accountability, and strives to make a meaningful impact on both the industry and the broader global community. Join us on this journey as we redefine possibilities and set new standards for [industry/sector] excellence. This is who we are...',
    },
    diverityStatement: {
      type: String,
      default:
        'We are on a mission to build an inclusive organisation. This is important to us because we want everyone to feel welcome. This is central to our purpose.',
    },
    diversityStatement_url: {
      type: String,
      default: 'https://google.com',
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
