export class Photo {
  private readonly id: string;
  private url: string;
  private readonly uploaderId: string;
  private readonly albumId: string;
  private facesData: object | null;
  private readonly createdAt: Date;

  constructor(props: { id: string; url: string; uploaderId: string; albumId: string; facesData?: object | null; createdAt?: Date }) {
    this.id = props.id;
    this.url = props.url;
    this.uploaderId = props.uploaderId;
    this.albumId = props.albumId;
    this.facesData = props.facesData ?? null;
    this.createdAt = props.createdAt ?? new Date();
  }

  public toJSON() {
    return {
      id: this.id,
      url: this.url,
      uploaderId: this.uploaderId,
      albumId: this.albumId,
      facesData: this.facesData,
      createdAt: this.createdAt,
    };
  }
}
