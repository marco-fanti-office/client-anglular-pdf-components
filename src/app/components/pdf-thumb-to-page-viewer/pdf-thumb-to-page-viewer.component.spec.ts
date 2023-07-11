import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfThumbToPageViewerComponent } from './pdf-thumb-to-page-viewer.component';

describe('PdfThumbToPageViewerComponent', () => {
  let component: PdfThumbToPageViewerComponent;
  let fixture: ComponentFixture<PdfThumbToPageViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfThumbToPageViewerComponent]
    });
    fixture = TestBed.createComponent(PdfThumbToPageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
