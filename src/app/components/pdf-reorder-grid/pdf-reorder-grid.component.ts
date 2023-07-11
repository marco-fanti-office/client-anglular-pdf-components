import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CdkDropList,
  CdkDragEnter,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { PdfOperationsService } from 'src/lib/models/services/http/pdf-operations.service';
import { Thumbnail } from 'src/lib/models/http-response/pdf-response.models';
import { PageSwitch } from 'src/lib/models/http-request/pdf-switch.models';

@Component({
  selector: 'app-pdf-reorder-grid',
  templateUrl: './pdf-reorder-grid.component.html',
  styleUrls: ['./pdf-reorder-grid.component.css']
})
export class PdfReorderGridComponent implements OnInit, AfterViewInit {
  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) placeholder: CdkDropList;

  public target: CdkDropList;
  public targetIndex: number;
  public source: CdkDropList;
  public sourceIndex: number;
  public activeContainer;

  constructor(private readonly _pdfService: PdfOperationsService) {}
  thumbnails : Array<Thumbnail> = [];

  public errorMessage:string;

  ngOnInit(): void {
    try {
      this._pdfService.createThumbnails().subscribe(thmb => {
        thmb.forEach(element => {
          this.thumbnails.push(element);
        });
      })
    } catch (error) {
      this.errorMessage = 'Impossibile caricare i thumbnails';
    }
  }

  ngAfterViewInit() {
    const phElement = this.placeholder.element.nativeElement;

    phElement.style.display = 'none';
    phElement.parentElement.removeChild(phElement);
  }

  public itemTrackBy(item) {
    return item.id;
  }

  dropListDropped() {
    if (!this.target) {
      return;
    }

    const phElement = this.placeholder.element.nativeElement;
    const parent = phElement.parentElement;

    phElement.style.display = 'none';

    parent.removeChild(phElement);
    parent.appendChild(phElement);
    parent.insertBefore(
      this.source.element.nativeElement,
      parent.children[this.sourceIndex]
    );

    this.target = null;
    this.source = null;
    this.activeContainer = null;

    if (this.sourceIndex !== this.targetIndex) {
      moveItemInArray(this.thumbnails, this.sourceIndex, this.targetIndex);
    }
  }

  cdkDropListEntered(e: CdkDragEnter) {
    const drag = e.item;
    const drop = e.container;

    if (drop === this.placeholder) {
      return true;
    }

    const phElement = this.placeholder.element.nativeElement;
    const sourceElement = drag.dropContainer.element.nativeElement;
    const dropElement = drop.element.nativeElement;

    sourceElement.style.backgroundColor = 'grey';

    console.log(phElement.getBoundingClientRect());
    console.log(sourceElement.getBoundingClientRect());
    console.log(dropElement.getBoundingClientRect());

    const dragIndex = __indexOf(
      dropElement.parentElement.children,
      this.source ? phElement : sourceElement
    );
    const dropIndex = __indexOf(
      dropElement.parentElement.children,
      dropElement
    );

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;

      phElement.style.width = dropElement.clientWidth / 2 + 'px';
      phElement.style.height = dropElement.clientHeight + 'px';
      console.log('dCont', sourceElement.clientWidth);
      console.log('ph', phElement.style.width, phElement.style.height);

      sourceElement.parentElement.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    phElement.style.display = '';
    dropElement.parentElement.insertBefore(
      phElement,
      dropIndex > dragIndex ? dropElement.nextSibling : dropElement
    );

    requestAnimationFrame(() => {
      this.placeholder._dropListRef.enter(
        drag._dragRef,
        drag.element.nativeElement.offsetLeft,
        drag.element.nativeElement.offsetTop
      );
    });
  }

  confirmChanges() {
    console.log("confirm changes");

    //createSwitches
    var listOfChanges: Array<PageSwitch> = [];

    this.thumbnails.forEach((thumbnail, index) =>
      listOfChanges.push(new PageSwitch(thumbnail.idPage, index)))

    this._pdfService.reorderPdf(listOfChanges)

    console.log("confirm changes - called server");

  }

}

function __indexOf(collection, node) {
  return Array.prototype.indexOf.call(collection, node);
}

