import { MedicamentosComponent } from './../medicamentos/medicamentos.component';
import { Paciente } from './../../models/pacientes';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { HistorialService } from './../../historial.service';
import { Router } from '@angular/router/src/router';


@Component({
  selector: 'app-userselect',
  templateUrl: './userselect.component.html',
  styleUrls: ['./userselect.component.css']
})
export class UserselectComponent implements OnInit {
  pacientes: Observable<Paciente[]>
  pacienteSelected: Paciente = {} as any;
  
  iden_Pac;

  constructor(private historialService: HistorialService) { }

  ngOnInit() {
    this.getPacientes();
    
  }

  getPacientes(){
    this.pacientes = this.historialService.getPacientes();
  }
}
