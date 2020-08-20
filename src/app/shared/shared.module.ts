import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from '@app/modules/custom-material/custom-material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog.component';
import { CommonService } from './services/common.service';
@NgModule({
  declarations: [
    BreadcrumbComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CustomMaterialModule
  ],
  providers: [
    CommonService
  ],
  exports: [
    BreadcrumbComponent,
    ConfirmDialogComponent,
  ]
})
export class SharedModule { }
