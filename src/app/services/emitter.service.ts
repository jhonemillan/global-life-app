import { ValoracionEnfermeria } from './../models/valoracion';
import { Paciente } from './../models/pacientes';
import { Injectable, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';


@Injectable()
export class EmitterService {

    pacienteSelected : Observable<Paciente>;
    valoracion: ValoracionEnfermeria = {} as any; 
    idProfesional: number;
    private subject = new Subject<any>();
   
    setPaciente(paciente: Paciente){
        this.subject.next(paciente);
    }

    getPaciente(): Observable<Paciente>{
        return this.subject.asObservable();
    }

    clearPaciente(){
        this.subject.next();
    }

    setVisita(visita: ValoracionEnfermeria){
        this.valoracion = visita;
    }

    getVisita(): ValoracionEnfermeria{
        return this.valoracion;
    }

    setIdPro(data: number){
        this.idProfesional = data;
    }

    getIdPro(){
        return this.idProfesional;
    }


}
