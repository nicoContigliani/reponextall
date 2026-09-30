import { model, models, Schema, type Document, type Model } from 'mongoose';

export interface IUser {
  _id?: string;
  id?: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUserDocument = Document<unknown, {}, IUser> & IUser;

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    firstName: { type: String },
    lastName: { type: String },
    role: {
      type: String,
      enum: ['user', 'admin', 'moderator'],
      default: 'user',
      required: true
    }
  },
  { timestamps: true, strictQuery: false }
);

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

export const UserModel: Model<IUser> =
  (models.User as Model<IUser>) || model<IUser>('User', UserSchema);

export default UserModel;
