import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfReorderGridComponent } from './pdf-reorder-grid.component';

describe('PdfReorderGridComponent', () => {
  let component: PdfReorderGridComponent;
  let fixture: ComponentFixture<PdfReorderGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfReorderGridComponent]
    });
    fixture = TestBed.createComponent(PdfReorderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
