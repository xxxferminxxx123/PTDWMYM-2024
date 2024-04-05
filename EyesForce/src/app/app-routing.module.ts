import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatosComponent } from './web/candidatos/candidatos.component';
import { HomeComponent } from './web/home/home.component'; 
import { PersonasComponent } from './web/personas/personas.component';
import { ProcesoTodosCandidatosComponent } from './web/proceso-todos-candidatos/proceso-todos-candidatos.component';
import { PagosComponent } from './web/pagos/pagos.component';
import { PagosvistaComponent } from './web/pagosvista/pagosvista.component';



const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
{
  path:'candidatos',
  component:CandidatosComponent
},
{
  path:'personas',
  component:PersonasComponent
},
{
  path:'proceso',
  component:ProcesoTodosCandidatosComponent
},
{
  path:'pagos',
  component:PagosComponent
},
{
  path:'pagosVista',
  component:PagosvistaComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
