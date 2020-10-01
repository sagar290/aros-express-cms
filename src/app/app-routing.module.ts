import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PendingParcelComponent } from './core/components/parcel/pending-parcel/pending-parcel.component';
import { StoredParcelComponent } from './core/components/parcel/stored-parcel/stored-parcel.component';
import { DeliveredParcelComponent } from './core/components/parcel/delivered-parcel/delivered-parcel.component';
import { PendingParcelsResolver } from './core/resolvers/pending-parcels.resolver';
import { StoredParcelsResolver } from './core/resolvers/stored-parcels.resolver';
import { DeliveredParcelsResolver } from './core/resolvers/delivered-parcels.resolver';
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
import { EditDeliverymanComponent } from './core/components/deliveryman/edit-deliveryman/edit-deliveryman.component';
import { DeliverymanResolver } from './core/resolvers/deliveryman.resolver';
import { EditPickupmanComponent } from './core/components/pickupman/edit-pickupman/edit-pickupman.component';
import { PickupmanResolver } from './core/resolvers/pickupman.resolver';
import { ProcessingParcelsResolver } from './core/resolvers/processing-parcels.resolver';
import { ProcessingParcelComponent } from './core/components/parcel/processing-parcel/processing-parcel.component';
import { InprogressParcelComponent } from './core/components/parcel/inprogress-parcel/inprogress-parcel.component';
import { InprogressParcelsResolver } from './core/resolvers/inprogress-parcels.resolver';
import { ReadyParcelComponent } from './core/components/parcel/ready-parcel/ready-parcel.component';
import { ReadyParcelsResolver } from './core/resolvers/ready-parcels.resolver';
import { UserComponent } from './core/components/Cms/user/user.component';
import { MerchantListComponent } from './core/components/merchant/merchant-list/merchant-list.component';
import { MerchantDetailsComponent } from './core/components/merchant/merchant-details/merchant-details.component';
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
            path: "processing",
            component: ProcessingParcelComponent,
            resolve: {
              parcels: ProcessingParcelsResolver
            },
            data: {
              breadcrumb: "Processing"
            }
          },
          {
            path: "inprogress",
            component: InprogressParcelComponent,
            resolve: {
              parcels: InprogressParcelsResolver
            },
            data: {
              breadcrumb: "In Progress"
            }
          },
          {
            path: "ready",
            component: ReadyParcelComponent,
            resolve: {
              parcels: ReadyParcelsResolver
            },
            data: {
              breadcrumb: "Ready"
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
            path: "delivered",
            component: DeliveredParcelComponent,
            resolve: {
              parcels: DeliveredParcelsResolver
            },
            data: {
              breadcrumb: "Delivered"
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
          },
          {
            path: "details",
            data: {
              breadcrumb: "Details"
            },
            children: [
              {
                path: ":deliveryman_id",
                component: EditDeliverymanComponent,
                resolve: {
                  deliveryman: DeliverymanResolver
                },
                data: {
                  breadcrumb: ""
                }
              }
            ]
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
          },
          {
            path: "details",
            data: {
              breadcrumb: "Details"
            },
            children: [
              {
                path: ":pickupman_id",
                component: EditPickupmanComponent,
                resolve: {
                  pickupman: PickupmanResolver
                },
                data: {
                  breadcrumb: ""
                }
              }
            ]
          }
        ]
      },
      {
        path: "cms",
        data: {
          breadcrumb: "CMS"
        },
        children: [
          {
            path: "",
            redirectTo: "user",
            pathMatch: "full"
          },
          {
            path: "user",
            component: UserComponent,
            data: {
              breadcrumb: "user"
            }
          },
          {
            path: "edit",
            component: UserComponent,
            data: {
              breadcrumb: "edit"
            }
          },
          {
            path: "merchants",
            component: MerchantListComponent,
            data: {
              breadcrumb: "Merchants"
            },
          },
          {
            path: "merchants/:merchant_id",
            component: MerchantDetailsComponent,
            data: {
              breadcrumb: "Merchants Details"
            },
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