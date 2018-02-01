import { AppComponent } from './app.component';
import { UserselectComponent } from './components/userselect/userselect.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';

const appRoutes: Routes = [
    {path: '', component: AppComponent},
    {path: 'visita', component: MedicamentosComponent},
    {path: '**', redirectTo: ''}
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