import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';

import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';

const IMP_EXP = [
    MatButtonModule,
    MatDialogModule,
    DragDropModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    MatFormFieldModule,
    NgxMatColorPickerModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatRadioModule
]

@NgModule({
    imports: [
        ...IMP_EXP
    ],
    declarations: [
    ],
    exports: [
        ...IMP_EXP
    ],
    providers: [
        {
            provide: MAT_COLOR_FORMATS,
            useValue: NGX_MAT_COLOR_FORMATS
        },
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class CustomMaterialModule {
}