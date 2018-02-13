import { ValoracionEnfermeria } from './../../models/valoracion';
import { MedicamentosComponent } from './../medicamentos/medicamentos.component';
import { Paciente } from './../../models/pacientes';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { HistorialService } from './../../historial.service';
import { Router } from '@angular/router/src/router';
import { MatSelectChange } from "@angular/material";
import {FormBuilder, FormGroup, Validators , ValidatorFn, AbstractControl, FormControl, ReactiveFormsModule} from '@angular/forms';
import { catchError, map, tap,startWith, switchMap, 
         debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';
         



@Component({
  selector: 'app-userselect',
  templateUrl: './userselect.component.html',
  styleUrls: ['./userselect.component.css']
})
export class UserselectComponent implements OnInit {
  pacientes: Observable<Paciente[]>
  visitas: Observable<ValoracionEnfermeria[]>
  pacienteSelected:Paciente = {} as any;
  idSelected;

  myControl: FormControl = new FormControl(); 
  filteredPacientes: Observable<any>;


  constructor(private historialService: HistorialService) { }

  ngOnInit() {
    this.getPacientes();

      this.filteredPacientes = this.myControl.valueChanges
        .pipe(
          startWith(null),
          debounceTime(200),           
          switchMap(val => {           
            return this.filter(val || '')
          })       
        );
  }

  filter(val: string): Observable<any[]> {
    return this.pacientes
    .pipe(
      map(response => response.filter(option => {       
        return option.nom_Pac.toLowerCase().indexOf(val.toLowerCase()) > -1
      }))
    )
  }

  getPacientes(){
    this.pacientes = this.historialService.getPacientes();
  }

  getVisitasPaciente(){
    this.visitas = this.historialService.getValoracionListPaciente(this.pacienteSelected.iden_Pac);
  }

  displayFn(paciente: Paciente): string {
    if(paciente != null)
        return paciente.nom_Pac + ' ' + paciente.ape_Pac
    
        return ' '
  }

  getPacienteFromAuto(paciente: Paciente){
      this.pacienteSelected = paciente;
      this.getVisitasPaciente();
  }
}
