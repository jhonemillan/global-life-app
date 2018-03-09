import {MatToolbarModule} from '@angular/material/toolbar';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../app/services/emitter.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  nombrePaciente = "";
  subscription: Subscription;

  constructor(private dataService: EmitterService){
    this.subscription = this.dataService.getPaciente().subscribe((data)=>{
        this.nombrePaciente = data.nom_Pac.trim() + ' ' + data.ape_Pac.trim();
    })
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
