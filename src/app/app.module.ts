import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PdfOperationsService } from 'src/lib/models/services/http/pdf-operations.service';
import { ServiceModules } from 'src/lib/models/services/service.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PdfReorderGridComponent } from './components/pdf-reorder-grid/pdf-reorder-grid.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PdfPageSplitterComponent } from './components/pdf-page-splitter/pdf-page-splitter.component';
import { PdfThumbToPageViewerComponent } from './components/pdf-thumb-to-page-viewer/pdf-thumb-to-page-viewer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    PdfReorderGridComponent,
    PdfPageSplitterComponent,
    PdfThumbToPageViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    DragDropModule,
    ServiceModules,
    PdfViewerModule,
    MatTabsModule,

    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [PdfOperationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

