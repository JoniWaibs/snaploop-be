import { User } from '@domain/entities/User';

export abstract class UserRepository {
  abstract findByConditions({ email, googleId }: { email?: string; googleId?: string }): Promise<User | null>;
  abstract create(user: User): Promise<User>;
  abstract update(user: User): Promise<User>;
}
