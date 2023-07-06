import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Thumbnail } from '../../http-response/pdf-response.models';
import { PageSwitch } from '../../http-request/pdf-switch.models';

@Injectable({ providedIn: 'root' })
export class PdfOperationsService {

  constructor(private http: HttpClient) {}

  private createThumbnailsEndpoint = 'http://localhost:4200/v1/pdf-services/create-thumbnails'
  private confirmChangesEndpoint = 'http://localhost:4200/v1/pdf-services/reorder-pages'

  createThumbnails<T>() : Observable<any> {
    return this.http.get<Thumbnail[]>(this.createThumbnailsEndpoint)
      .pipe(map((res) => {
        return res;
      }));
  }

  reorderPdf<T>(listOfChanges: PageSwitch[]) {

    listOfChanges.forEach(ch => {console.log("send positions to server "+ch.fromIndex +", "+ch.toIndex)})

    this.http.put(this.confirmChangesEndpoint, listOfChanges).subscribe();
    return null;
  }

}
