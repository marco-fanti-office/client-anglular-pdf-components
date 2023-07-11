import { Component, OnInit, Inject } from '@angular/core';
import { PageNumber } from 'src/lib/models/http-request/pdf-switch.models';
import { Thumbnail } from 'src/lib/models/http-response/pdf-response.models';
import { PdfOperationsService } from 'src/lib/models/services/http/pdf-operations.service';

import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-thumb-to-page-viewer',
  templateUrl: './pdf-thumb-to-page-viewer.component.html',
  styleUrls: ['./pdf-thumb-to-page-viewer.component.css']
})
export class PdfThumbToPageViewerComponent implements OnInit {

  constructor(  public dialog: MatDialog,
                private readonly _pdfService: PdfOperationsService) {}
  thumbnails : Array<Thumbnail> = [];
  listOfPages : Array<PageNumber> = [];

  confirmDisabled: boolean = true;
  itemSelected = 0;

  ngOnInit(): void {
    this._pdfService.createThumbnails().subscribe(thmb => {
      thmb.forEach(element => {
        this.thumbnails.push(element);
      });
    })
  }

  selectElement(e:HTMLElement, idPage:number): void {
    e.classList.add("item-selected");

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {index: idPage}
    });

    dialogRef.afterClosed().subscribe(result => {
      e.classList.remove("item-selected");
    });

  }

}


@Component({
  selector: 'pdf-viewpage-popup',
  templateUrl: './pdf-viewpage-popup.html',
  styleUrls: ['./pdf-thumb-to-page-viewer.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class DialogOverviewExampleDialog {

  previewBytes:string;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PageNumber,
    private readonly _pdfService: PdfOperationsService) {
    console.log('I call service to show page '+(data.index+1));
    _pdfService.getPagePreviewBase64(new PageNumber(data.index)).subscribe(el=> {this.previewBytes=el.base64ByteArray;});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
