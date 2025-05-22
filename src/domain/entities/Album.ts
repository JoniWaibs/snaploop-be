import { User } from '@domain/entities/User';

export class Album {
  private readonly id: string;
  private name: string;
  private readonly createdAt: Date;
  private users: User[];
  //private photos: Photo[];

  constructor(props: { id: string; name: string; createdAt?: Date; users?: User[] }) {
    this.id = props.id;
    this.name = props.name;
    this.createdAt = props.createdAt ?? new Date();
    this.users = props.users ?? [];
    //this.photos = props.photos ?? [];
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
    };
  }
}
