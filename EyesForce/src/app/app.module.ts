import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonasComponent } from './web/personas/personas.component';
import { CandidatosComponent } from './web/candidatos/candidatos.component';
import { HomeComponent } from './web/home/home.component';
import { SnipperComponent } from './web/snipper/snipper.component';
import { Clasepersona } from './clases/persona/clasepersona'; 
import { Clasecandidato } from './clases/candidato/clasecandidato'; 
import { BarraLateralComponent } from './barra-lateral/barra-lateral.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ProcesoTodosCandidatosComponent } from './web/proceso-todos-candidatos/proceso-todos-candidatos.component';
import { MatTableModule } from '@angular/material/table';
import { PagosComponent } from './web/pagos/pagos.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog'; 
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './web/pagos/dialog/dialog.component';
import { PagosvistaComponent } from './web/pagosvista/pagosvista.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogvistapagosComponent } from './web/pagos/dialogvistapagos/dialogvistapagos.component';



@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    CandidatosComponent,
    HomeComponent,
    SnipperComponent,
    BarraLateralComponent,
    ProcesoTodosCandidatosComponent,
    PagosComponent,
    DialogComponent,
    PagosvistaComponent,
    DialogvistapagosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,


  ]
  ,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
