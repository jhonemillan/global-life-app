import { ValoracionEnfermeria } from './../models/valoracion';
import { Paciente } from './../models/pacientes';
import { Injectable, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class EmitterService {

    pacienteSelected:Paciente = {} as any;
    valoracion: ValoracionEnfermeria = {} as any; 
   
    setPaciente(paciente: Paciente){
        this.pacienteSelected = paciente;
    }

    getPaciente(): Paciente{
        return this.pacienteSelected;
    }

    setVisita(visita: ValoracionEnfermeria){
        this.valoracion = visita;
    }

    getVisita(): ValoracionEnfermeria{
        return this.valoracion;
    }


}
