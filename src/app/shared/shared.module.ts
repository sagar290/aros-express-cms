import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PercPipe } from './pipes/perc.pipe';
import { CategoryNamePipe } from './pipes/category-name.pipe';
import { ItemNamePipe } from './pipes/item-name.pipe';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { CustomMaterialModule } from '@app/modules/custom-material/custom-material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog.component';
import { CommonService } from './services/common.service';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    DateSelectorComponent,
    PercPipe,
    FileUploaderComponent,
    ConfirmDialogComponent,
    CategoryNamePipe,
    ItemNamePipe,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgxDaterangepickerMd.forRoot(),
    CustomMaterialModule
  ],
  providers: [
    CommonService
  ],
  exports: [
    BreadcrumbComponent,
    DateSelectorComponent,
    PercPipe,
    CategoryNamePipe,
    ItemNamePipe,
    FileUploaderComponent,
    ConfirmDialogComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
