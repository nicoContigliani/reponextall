import type { PaginatedResult } from '@/types';
import { UserModel, type IUser } from '../model/user.model';
import dbConnect from '@/lib/db';

export type CreateUserDTO = Omit<IUser, 'createdAt' | 'updatedAt'>;
export type UpdateUserDTO = Partial<CreateUserDTO>;

export class UserRepository {
  async findAll(filter: Record<string, unknown> = {}): Promise<IUser[]> {
    await dbConnect();
    return UserModel.find(filter).sort({ createdAt: -1 }).lean();
  }

  async findById(id: string): Promise<IUser | null> {
    await dbConnect();
    return UserModel.findById(id).lean();
  }

  async findByClerkId(clerkId: string): Promise<IUser | null> {
    await dbConnect();
    return UserModel.findOne({ clerkId }).lean();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    await dbConnect();
    return UserModel.findOne({ email }).lean();
  }

  async paginate(
    filter: Record<string, unknown> = {},
    page: number,
    pageSize: number
  ): Promise<PaginatedResult<IUser>> {
    await dbConnect();
    const skip = (page - 1) * pageSize;
    const [data, total] = await Promise.all([
      UserModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      UserModel.countDocuments(filter).exec()
    ]);
    return { data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  async create(data: CreateUserDTO): Promise<IUser> {
    await dbConnect();
    const doc = await UserModel.create(data);
    return doc.toObject() as IUser;
  }

  async update(id: string, data: UpdateUserDTO): Promise<IUser | null> {
    await dbConnect();
    return UserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
  }

  async delete(id: string): Promise<IUser | null> {
    await dbConnect();
    return UserModel.findByIdAndDelete(id).lean();
  }
}

export const userRepository = new UserRepository();
