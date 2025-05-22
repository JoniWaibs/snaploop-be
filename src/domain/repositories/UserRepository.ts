import { User } from '@domain/entities/User';

export interface UserRepository {
  findByConditions({ email, googleId }: { email?: string; googleId?: string }): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
}
