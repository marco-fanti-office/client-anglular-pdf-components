import { Component, OnInit } from '@angular/core';

import { PdfOperationsService } from 'src/lib/models/services/http/pdf-operations.service';
import { Thumbnail } from 'src/lib/models/http-response/pdf-response.models';
import { PageNumber } from 'src/lib/models/http-request/pdf-switch.models';

@Component({
  selector: 'app-pdf-page-splitter',
  templateUrl: './pdf-page-splitter.component.html',
  styleUrls: ['./pdf-page-splitter.component.css']
})
export class PdfPageSplitterComponent implements OnInit {

  constructor(private readonly _pdfService: PdfOperationsService) {}
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

  selectElement(e:HTMLElement, index:number): void {

    if (e.getAttribute("selected") == "true") {
      e.classList.remove("item-selected");
      e.setAttribute("selected","false");
      this.listOfPages.forEach((p,position)=>{if(p.index===index) delete this.listOfPages[position];});
      this.itemSelected--;
    } else {
      e.classList.add("item-selected");
      e.setAttribute("selected","true");
      this.listOfPages.push(new PageNumber(index));
      this.itemSelected++;
    }

    if (this.itemSelected > 0)
      this.confirmDisabled = false;
    else
      this.confirmDisabled = true;

  }

  confirmChanges() {
    console.log("confirm changes");

    this.listOfPages = [];

    this.listOfPages.forEach(p => {
      console.log('extract page '+(p.index+1));
    })

    this._pdfService.splitPdf(this.listOfPages)

    console.log("confirm changes - called server");

  }


}
