import { userRepository, type CreateUserDTO, type UpdateUserDTO } from './repository';
import { UserSchema, type UserInput } from '@/lib/validations/schemas';
import { getAuthUser } from '@/lib/auth';
import type { PaginatedResult } from '@/types';
import type { IUser } from '../model/user.model';

function toDTO(input: UserInput): CreateUserDTO {
  return {
    clerkId: input.clerkId,
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    role: input.role
  };
}

function mapToDTO(input: UserInput, existing: IUser): UpdateUserDTO {
  return {
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    role: input.role,
    clerkId: existing.clerkId
  };
}

export class UserService {
  async list(filter: Record<string, unknown> = {}): Promise<IUser[]> {
    return userRepository.findAll(filter);
  }

  async paginate(page: number, pageSize: number): Promise<PaginatedResult<IUser>> {
    return userRepository.paginate({}, page, pageSize);
  }

  async get(id: string): Promise<IUser | null> {
    return userRepository.findById(id);
  }

  async getByClerkId(clerkId: string): Promise<IUser | null> {
    return userRepository.findByClerkId(clerkId);
  }

  async create(input: UserInput): Promise<IUser> {
    UserSchema.parse(input);
    await this.ensureAuthorized();

    const exists = await userRepository.findByEmail(input.email);
    if (exists) {
      throw new Error(`Ya existe un usuario con el email ${input.email}`);
    }

    const existingClerk = await userRepository.findByClerkId(input.clerkId);
    if (existingClerk) {
      throw new Error(`Ya existe un usuario con el clerkId ${input.clerkId}`);
    }

    return userRepository.create(toDTO(input));
  }

  async update(id: string, input: UserInput): Promise<IUser | null> {
    UserSchema.parse(input);
    await this.ensureAuthorized();

    const existing = await userRepository.findById(id);
    if (!existing) {
      throw new Error('Usuario no encontrado');
    }

    return userRepository.update(id, mapToDTO(input, existing));
  }

  async remove(id: string): Promise<IUser | null> {
    await this.ensureAuthorized();
    return userRepository.delete(id);
  }

  private async ensureAuthorized(): Promise<void> {
    const user = await getAuthUser();
    if (!user) {
      throw new Error('No autorizado');
    }
    if (user.role !== 'admin' && user.role !== 'moderator') {
      throw new Error('Permisos insuficientes');
    }
  }
}

export const userService = new UserService();
