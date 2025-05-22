import { User } from '@domain/entities/User';
import { UserRepository } from '@domain/repositories/UserRepository';
import { PrismaClient } from '@prisma/client';

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}
  async findByConditions({ email, googleId }: { email?: string; googleId?: string }): Promise<User | null> {
    if (!email && !googleId) return null;

    let user = null;

    if (email) {
      user = await this.prisma.user.findUnique({
        where: { email },
      });
    }

    if (!user && googleId) {
      user = await this.prisma.user.findUnique({
        where: { id: googleId },
      });
    }

    if (!user) return null;

    return this.mapPrismaUserToDomain(user);
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        picture: user.picture,
        id: user.id,
      },
    });

    return this.mapPrismaUserToDomain(createdUser);
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        name: user.name,
        picture: user.picture,
        updatedAt: new Date(),
      },
    });

    return this.mapPrismaUserToDomain(updatedUser);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private mapPrismaUserToDomain(prismaUser: any): User {
    return new User({
      id: prismaUser.id,
      email: prismaUser.email,
      name: prismaUser.name,
      picture: prismaUser.picture,
      googleId: prismaUser.id,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    });
  }
}
