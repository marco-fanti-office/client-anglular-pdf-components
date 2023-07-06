export class Thumbnail {
  idPage: number;
  base64ByteArray: string;

  constructor(idPage: number, base64ByteArray: string) {
    this.idPage = idPage;
    this.base64ByteArray = base64ByteArray;
  }

}

export interface ICreationThumbnailsResponse {
  readonly thumbnails: Thumbnail[]
}
