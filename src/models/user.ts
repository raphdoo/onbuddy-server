import mongoose from 'mongoose';

// An interface that describes the properties required to create a new user
interface UserAttrs {
  firstname: string;
  lastname: string;
  company: string;
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
interface UserDoc extends mongoose.Document {
  firstname: string;
  lastname: string;
  company: string;
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

export enum UserStatus {
  Active = 'active',
  Deactivated = 'deactivated',
}

export enum Roles {
  Employee = 'employee',
  Admin = 'admin',
}

export enum CandidateTypes {
  Interns = 'interns',
  Graduate = 'graduate',
  Experience = 'experienced',
  NotProvided = '-',
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
      default: '-',
    },
    manager: {
      type: String,
      default: '-',
    },
    programTrack: {
      type: String,
      default: '-',
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
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
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
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    // const hashed = await Password.toHash(this.get('password'));
    // this.set('password', hashed);
  }

  done();
});

//adding build method to mongoose userSchema object
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User };
