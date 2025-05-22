export class AlbumUser {
  private readonly userId: string;
  private readonly albumId: string;

  constructor(props: { userId: string; albumId: string }) {
    this.userId = props.userId;
    this.albumId = props.albumId;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getAlbumId(): string {
    return this.albumId;
  }

  public toJSON() {
    return {
      userId: this.userId,
      albumId: this.albumId,
    };
  }
}
