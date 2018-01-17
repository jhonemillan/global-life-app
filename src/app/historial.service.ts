import { historial_medicamentos } from './models/historial_medicamentos';
import { Medicamento } from './models/medicamento';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HistorialService {
domain ="http://localhost:3000";

  constructor(private http: Http) { }

  getMedicamentos(): Observable<Medicamento[]>{
    return this.http.get(this.domain + '/medicamento/getAll').map(res=> res.json()).catch(this.handleError);
  }

  getHistorialPaciente(): Observable<historial_medicamentos[]>{   
    return this.http.get(this.domain + '/seguimiento/getAll').map(res=> res.json())
                                                             .catch(this.handleError);
  }

  addMedicamentoHist(data: historial_medicamentos): Observable<historial_medicamentos[]>{      
    return this.http.post(this.domain + '/seguimiento/add',data).map(res=> res.json()).catch(this.handleError);    
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

