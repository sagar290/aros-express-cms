import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthRoutingModule } from '../modules/authentication/auth-routing.module';
import { ReportsComponent } from './components/reports/reports.component';
import { SharedModule } from '../shared/shared.module';
import { CreatePromoComponent } from './components/promo-codes/create-promo/create-promo.component';
import { AllPromoComponent } from './components/promo-codes/all-promo/all-promo.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CustomMaterialModule } from '@app/modules/custom-material/custom-material.module';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { PendingParcelsResolver } from './resolvers/pending-parcels.resolver';
import { CancelledParcelsResolver } from './resolvers/cancelled-parcels.resolver';
import { CompletedParcelsResolver } from './resolvers/completed-parcels.resolver';
import { ProcessedParcelsResolver } from './resolvers/processed-parcels.resolver';
import { PickedParcelsResolver } from './resolvers/picked-parcles.resolver';
import { StoredParcelsResolver } from './resolvers/stored-parcels.resolver';
import { ParcelResolver } from './resolvers/parcel.resolver';
import { PickupmenResolver } from './resolvers/pickupmen.resolver';
import { DeliverymenResolver } from './resolvers/deliverymen.resolver';
import { EditPromoComponent } from './components/promo-codes/edit-promo/edit-promo.component';
import { AllTransactionComponent } from './components/reports/transactions/all-transaction/all-transaction.component';
import { PendingParcelComponent } from './components/parcel/pending-parcel/pending-parcel.component';
import { StoredParcelComponent } from './components/parcel/stored-parcel/stored-parcel.component';
import { ProcessedParcelComponent } from './components/parcel/processed-parcel/processed-parcel.component';
import { CompletedParcelComponent } from './components/parcel/completed-parcel/completed-parcel.component';
import { CancelledParcelComponent } from './components/parcel/cancelled-parcel/cancelled-parcel.component';
import { EditParcelComponent } from './components/parcel/edit-parcel/edit-parcel.component';
import { AllPickupmanComponent } from './components/pickupman/all-pickupman/all-pickupman.component';
import { AddPickupmanComponent } from './components/pickupman/add-pickupman/add-pickupman.component';
import { AddDeliverymanComponent } from './components/deliveryman/add-deliveryman/add-deliveryman.component';
import { AllDeliverymanComponent } from './components/deliveryman/all-deliveryman/all-deliveryman.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditDeliverymanComponent } from './components/deliveryman/edit-deliveryman/edit-deliveryman.component';
import { EditPickupmanComponent } from './components/pickupman/edit-pickupman/edit-pickupman.component';
import { PickedParcelComponent } from './components/parcel/picked-parcel/picked-parcel.component';

const IMP_EXP = [
  HeaderComponent,
  SidebarComponent,
  LayoutComponent,
  ReportsComponent,
  CreatePromoComponent,
  AllPromoComponent,
  EditPromoComponent,
  AllTransactionComponent
]

@NgModule({
  declarations: [
    ...IMP_EXP,
    PendingParcelComponent,
    StoredParcelComponent,
    ProcessedParcelComponent,
    CompletedParcelComponent,
    CancelledParcelComponent,
    EditParcelComponent,
    AllPickupmanComponent,
    AddPickupmanComponent,
    AddDeliverymanComponent,
    AllDeliverymanComponent,
    EditDeliverymanComponent,
    EditPickupmanComponent,
    PickedParcelComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    HttpClientModule,
    NgxMaterialTimepickerModule.setLocale('bn-BD'),
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          // ['blockquote'],

          // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          // [{ 'direction': 'rtl' }],                         // text direction

          // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          // [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean'],                                       // remove formatting button

          ['link', 'image', 'video',]                   // link and image, video

        ]
      },
      theme: 'snow'
    }),
  ],
  providers: [
    AuthGuard,
    PendingParcelsResolver,
    CancelledParcelsResolver,
    CompletedParcelsResolver,
    ProcessedParcelsResolver,
    StoredParcelsResolver,
    ParcelResolver,
    PickupmenResolver,
    DeliverymenResolver,
    PickedParcelsResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  exports: [
    ...IMP_EXP,
    CustomMaterialModule,
    PendingParcelComponent,
    StoredParcelComponent,
    ProcessedParcelComponent,
    CompletedParcelComponent,
    CancelledParcelComponent,
    EditParcelComponent,
    AllPickupmanComponent,
    AddPickupmanComponent,
    AddDeliverymanComponent,
    AllDeliverymanComponent,
    EditDeliverymanComponent,
    EditPickupmanComponent,
    PickedParcelComponent,
  ]
})
export class CoreModule { }
