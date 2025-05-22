import { PlanType } from '@prisma/client';

export class User {
  public id: string;
  public email: string;
  public name: string | null;
  public picture: string | null;
  public role: PlanType;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  //public albums: Album[];
  //public photos: Photo[];

  constructor(props: {
    id: string;
    email: string;
    name?: string | null;
    picture?: string | null;
    role?: PlanType;
    createdAt?: Date;
    updatedAt?: Date;
    googleId?: string | null;
  }) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name ?? null;
    this.picture = props.picture ?? null;
    this.role = props.role ?? PlanType.FREE;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  public toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      picture: this.picture,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
