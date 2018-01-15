import { historial_medicamentos } from './models/historial_medicamentos';
import { Medicamento } from './models/medicamento';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class HistorialService {
domain ="http://localhost:3000";

  constructor(private http: Http) { }

  getMedicamentos(): Observable<Medicamento[]>{
    return this.http.get(this.domain + '/medicamento/getAll').map(res=> res.json());
  }

  getHistorialPaciente(): Observable<historial_medicamentos[]>{
    console.log('entra');
    return this.http.get(this.domain + '/seguimiento/getAll').map(res=> res.json());
  }

  addMedicamentoHist(data: historial_medicamentos){  
    console.log(data);
    return this.http.post(this.domain + '/seguimiento/add',data).map(res=> res.json());
  }

}

