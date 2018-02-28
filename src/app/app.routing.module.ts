import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { AppComponent } from './app.component';
import { UserselectComponent } from './components/userselect/userselect.component';


const appRoutes: Routes = [
  { path: '',   component: UserselectComponent},
  { path: 'selectuser',   component: UserselectComponent},
  { path: 'visita/:id',   component: UserselectComponent},
  { path: 'visita/:id_pac/:id_visita',   component: MedicamentosComponent},
  { path: 'visita/:id_pac/:id_visita/:usuario',   component: MedicamentosComponent},
  { path: 'visita',   component: MedicamentosComponent},
  { path: '**', redirectTo: '' }
];  

@NgModule({
  declarations: [    
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes      
    ) 
  ],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }