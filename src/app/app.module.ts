import { AppRoutingModule } from './app.routing.module';
import { EmitterService } from './services/emitter.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http'
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import 'hammerjs'

import {  
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatAutocomplete,
  MatFormFieldModule, 
  
  

} from '@angular/material';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { HistorialService } from './historial.service';
import { UserselectComponent } from './components/userselect/userselect.component';


@NgModule({
  declarations: [
    AppComponent,
    MedicamentosComponent,    
    UserselectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatCardModule,
    MatSlideToggleModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [HistorialService, HttpClientModule, EmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
