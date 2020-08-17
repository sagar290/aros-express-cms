import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PendingParcelComponent } from './core/components/parcel/pending-parcel/pending-parcel.component';
import { StoredParcelComponent } from './core/components/parcel/stored-parcel/stored-parcel.component';
import { ProcessedParcelComponent } from './core/components/parcel/processed-parcel/processed-parcel.component';
import { CompletedParcelComponent } from './core/components/parcel/completed-parcel/completed-parcel.component';
import { PendingParcelsResolver } from './core/resolvers/pending-parcels.resolver';
import { StoredParcelsResolver } from './core/resolvers/stored-parcels.resolver';
import { ProcessedParcelsResolver } from './core/resolvers/processed-parcels.resolver';
import { CompletedParcelsResolver } from './core/resolvers/completed-parcels.resolver';
import { CancelledParcelComponent } from './core/components/parcel/cancelled-parcel/cancelled-parcel.component';
import { CancelledParcelsResolver } from './core/resolvers/cancelled-parcels.resolver';
import { EditParcelComponent } from './core/components/parcel/edit-parcel/edit-parcel.component';
import { ParcelResolver } from './core/resolvers/parcel.resolver';
import { PickupmenResolver } from './core/resolvers/pickupmen.resolver';
import { DeliverymenResolver } from './core/resolvers/deliverymen.resolver';
import { AddDeliverymanComponent } from './core/components/deliveryman/add-deliveryman/add-deliveryman.component';
import { AllDeliverymanComponent } from './core/components/deliveryman/all-deliveryman/all-deliveryman.component';
import { AddPickupmanComponent } from './core/components/pickupman/add-pickupman/add-pickupman.component';
import { AllPickupmanComponent } from './core/components/pickupman/all-pickupman/all-pickupman.component';
import { PickedParcelComponent } from './core/components/parcel/picked-parcel/picked-parcel.component';
import { PickedParcelsResolver } from './core/resolvers/picked-parcles.resolver';
const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "parcel/pending",
        pathMatch: "full"
      },
      {
        path: "parcel",
        data: {
          breadcrumb: "Parcel"
        },
        children: [
          {
            path: "details",
            data: {
              breadcrumb: "Details"
            },
            children: [
              {
                path: ":parcel_id",
                component: EditParcelComponent,
                resolve: {
                  parcel: ParcelResolver,
                  pickupmen: PickupmenResolver,
                  deliverymen: DeliverymenResolver
                },
                data: {
                  breadcrumb: ""
                }
              }
            ]
          },
          {
            path: "pending",
            component: PendingParcelComponent,
            resolve: {
              parcels: PendingParcelsResolver
            },
            data: {
              breadcrumb: "Pending"
            }
          },
          {
            path: "stored",
            component: StoredParcelComponent,
            resolve: {
              parcels: StoredParcelsResolver
            },
            data: {
              breadcrumb: "Stored"
            }
          },
          {
            path: "processed",
            component: ProcessedParcelComponent,
            resolve: {
              parcels: ProcessedParcelsResolver
            },
            data: {
              breadcrumb: "Processed"
            }
          },
          {
            path: "picked",
            component: PickedParcelComponent,
            resolve: {
              parcels: PickedParcelsResolver
            },
            data: {
              breadcrumb: "Picked"
            }
          },
          {
            path: "completed",
            component: CompletedParcelComponent,
            resolve: {
              parcels: CompletedParcelsResolver
            },
            data: {
              breadcrumb: "Completed"
            }
          },
          {
            path: "cancelled",
            component: CancelledParcelComponent,
            resolve: {
              parcels: CancelledParcelsResolver
            },
            data: {
              breadcrumb: "Cancelled"
            }
          }
        ]
      },
      {
        path: "deliveryman",
        data: {
          breadcrumb: "Deliveryman"
        },
        children: [
          {
            path: "",
            redirectTo: "all",
            pathMatch: "full"
          },
          {
            path: "add",
            component: AddDeliverymanComponent,
            data: {
              breadcrumb: "Add"
            }
          },
          {
            path: "all",
            component: AllDeliverymanComponent,
            data: {
              breadcrumb: "All"
            },
            resolve: {
              deliverymen: DeliverymenResolver
            }
          }
        ]
      },
      {
        path: "pickupman",
        data: {
          breadcrumb: "Pickupman"
        },
        children: [
          {
            path: "",
            redirectTo: "all",
            pathMatch: "full"
          },
          {
            path: "add",
            component: AddPickupmanComponent,
            data: {
              breadcrumb: "Add"
            }
          },
          {
            path: "all",
            component: AllPickupmanComponent,
            data: {
              breadcrumb: "All"
            },
            resolve: {
              pickupmen: PickupmenResolver
            }
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }