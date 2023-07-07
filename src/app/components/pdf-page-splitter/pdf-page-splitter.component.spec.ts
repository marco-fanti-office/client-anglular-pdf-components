import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPageSplitterComponent } from './pdf-page-splitter.component';

describe('PdfPageSplitterComponent', () => {
  let component: PdfPageSplitterComponent;
  let fixture: ComponentFixture<PdfPageSplitterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfPageSplitterComponent]
    });
    fixture = TestBed.createComponent(PdfPageSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
