import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError} from 'rxjs';
import { Thumbnail } from '../../http-response/pdf-response.models';
import { PageNumber, PageSwitch } from '../../http-request/pdf-switch.models';

@Injectable({ providedIn: 'root' })
export class PdfOperationsService {

  constructor(private http: HttpClient) {}

  private createThumbnailsEndpoint = 'http://localhost:4200/v1/pdf-services/create-thumbnails';
  private confirmChangesEndpoint = 'http://localhost:4200/v1/pdf-services/reorder-pages';
  private confirmSplitEndpoint = 'http://localhost:4200/v1/pdf-services/split-document-for-pages';
  private pagePreviewBase64 = 'http://localhost:4200/v1/pdf-services/page-preview-base64';

  createThumbnails<T>() : Observable<any> {
    return this.http.get<Thumbnail[]>(this.createThumbnailsEndpoint)
      .pipe(
        map((res) => {return res;})
      );
  }

  reorderPdf<T>(listOfChanges: PageSwitch[]) : void {
    listOfChanges.forEach(ch => {console.log("send positions to server "+ch.fromIndex +", "+ch.toIndex)})
    this.http.put(this.confirmChangesEndpoint, listOfChanges).subscribe();
  }

  splitPdf<T>(listOfPagesIndex: PageNumber[]) : void {
    listOfPagesIndex.forEach(ch => {console.log("send selected pages to server "+ch.index)});
    this.http.put(this.confirmSplitEndpoint, listOfPagesIndex).subscribe();
  }

  getPagePreviewBase64<T>(pageIndex: PageNumber) : Observable<Thumbnail> {
    return this.http.get<Thumbnail>(this.pagePreviewBase64+"?pageIndex="+pageIndex.index)
    .pipe(map((res) => {
      return res;
    }));
  }

  private handleError(error: HttpErrorResponse) {

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error('Backend returned code '+error.status+', body was: ', error.error);

    // Return an observable with a user-facing error message.
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
  }
}
