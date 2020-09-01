import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthRoutingModule } from '../modules/authentication/auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomMaterialModule } from '@app/modules/custom-material/custom-material.module';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { PendingParcelsResolver } from './resolvers/pending-parcels.resolver';
import { CancelledParcelsResolver } from './resolvers/cancelled-parcels.resolver';
import { DeliveredParcelsResolver } from './resolvers/delivered-parcels.resolver';
import { ProcessingParcelsResolver } from './resolvers/processing-parcels.resolver';
import { PickedParcelsResolver } from './resolvers/picked-parcles.resolver';
import { StoredParcelsResolver } from './resolvers/stored-parcels.resolver';
import { ParcelResolver } from './resolvers/parcel.resolver';
import { PickupmenResolver } from './resolvers/pickupmen.resolver';
import { PickupmanResolver } from './resolvers/pickupman.resolver';
import { DeliverymenResolver } from './resolvers/deliverymen.resolver';
import { InprogressParcelsResolver } from './resolvers/inprogress-parcels.resolver';
import { ReadyParcelsResolver } from './resolvers/ready-parcels.resolver';
import { DeliverymanResolver } from './resolvers/deliveryman.resolver';
import { PendingParcelComponent } from './components/parcel/pending-parcel/pending-parcel.component';
import { StoredParcelComponent } from './components/parcel/stored-parcel/stored-parcel.component';
import { ProcessingParcelComponent } from './components/parcel/processing-parcel/processing-parcel.component';
import { DeliveredParcelComponent } from './components/parcel/delivered-parcel/delivered-parcel.component';
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
import { ReadyParcelComponent } from './components/parcel/ready-parcel/ready-parcel.component';
import { InprogressParcelComponent } from './components/parcel/inprogress-parcel/inprogress-parcel.component';
import { CustomErrorHandler } from "./handlers/error.handler";
import { UserComponent } from './components/Cms/user/user.component';
const IMP_EXP = [
  HeaderComponent,
  SidebarComponent,
  LayoutComponent,
  PendingParcelComponent,
  StoredParcelComponent,
  ProcessingParcelComponent,
  DeliveredParcelComponent,
  CancelledParcelComponent,
  EditParcelComponent,
  AllPickupmanComponent,
  AddPickupmanComponent,
  AddDeliverymanComponent,
  AllDeliverymanComponent,
  EditDeliverymanComponent,
  EditPickupmanComponent,
  PickedParcelComponent,
  ReadyParcelComponent,
  InprogressParcelComponent
]

@NgModule({
  declarations: [
    ...IMP_EXP,
    UserComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    HttpClientModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    PendingParcelsResolver,
    CancelledParcelsResolver,
    DeliveredParcelsResolver,
    ProcessingParcelsResolver,
    StoredParcelsResolver,
    ParcelResolver,
    PickupmenResolver,
    PickupmanResolver,
    DeliverymenResolver,
    DeliverymanResolver,
    PickedParcelsResolver,
    InprogressParcelsResolver,
    ReadyParcelsResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    // {
    //   provide: ErrorHandler,
    //   useClass: CustomErrorHandler
    // }
  ],
  exports: [
    ...IMP_EXP,
    CustomMaterialModule
  ]
})
export class CoreModule { }
