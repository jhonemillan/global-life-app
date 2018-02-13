import { Paciente } from './models/pacientes';
import { historial_medicamentos } from './models/historial_medicamentos';
import { Medicamento } from './models/medicamento';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ValoracionEnfermeria } from './models/valoracion';

@Injectable()
export class HistorialService {
domain ="http://localhost:3000";

  constructor(private http: Http) { }

  getMedicamentos(): Observable<Medicamento[]>{
    return this.http.get(this.domain + '/medicamento/getAll').map(res=> res.json()).catch(this.handleError);
  }

  getPacientes(): Observable<Paciente[]>{
    return this.http.get(this.domain + '/pacientes/getListPacientes').map(res=> res.json()).catch(this.handleError);
  }

  getHistorialPaciente(id): Observable<historial_medicamentos[]>{   
    return this.http.get(this.domain + '/seguimiento/getAll/' + id).map(res=> res.json())
                                                             .catch(this.handleError);
  }

  addMedicamentoHist(data: historial_medicamentos): Observable<historial_medicamentos[]>{      
    return this.http.post(this.domain + '/seguimiento/add',data).map(res=> res.json()).catch(this.handleError);    
  }

  addValoracionPaciente(data: ValoracionEnfermeria): Observable<any>{
    return this.http.post(this.domain + '/valoracion/add',data)
    .map(res=> res.json())
    .catch(this.handleError);
  }

  updateValoracionPaciente(data: ValoracionEnfermeria): Observable<any>{
    return this.http.put(this.domain + '/valoracion/update/'+data.Id_ValSegEnf.toString(),data).map(res=>res.json())
                                                                                               .catch(this.handleError);    
  }

  getValoracionListPaciente(id): Observable<ValoracionEnfermeria[]>{
    return this.http.get(this.domain + '/valoracion/getAll/' + id).map(res=> res.json())
                                                             .catch(this.handleError);
  }

  deleteHistPaciente(id): Observable<historial_medicamentos[]>{
    return this.http.delete(this.domain + '/seguimiento/delete/'+id.toString()).map(res=> res.json())
                                                                               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

