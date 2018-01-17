import { historial_medicamentos } from './../../models/historial_medicamentos';
import { Observable } from 'rxjs/Rx';
import { HistorialService } from './../../historial.service';
import { Medicamento } from './../../models/medicamento';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit {
  medicamentos: Observable<Medicamento[]>;
  insumoPaciente = {} as historial_medicamentos;
  historial: Observable<historial_medicamentos[]>;
  selectedMed: string;
  dataSource = new HistDataSource(this.historialService);
  displayedColumns = ['id_prod', 'dosis', 'hora'];
  //myControl = new FormControl();
  //filteredOptions: Observable<Medicamento[]>;



  constructor(private historialService: HistorialService) { }

  ngOnInit() {
    this.GetMedicamentos();
    this.GetHistMedicPaciente();

    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith<string | Medicamento>(''),
    //     map(value => typeof value === 'string' ? value : value.nom_prod)
    //   );
  }

  // filter(val: string): Observable<Medicamento[]> {
  //   return this.medicamentos
  //       .map(response => response.filter(
  //           option => option.nom_prod.toLowerCase().indexOf(val.toLowerCase()) === 0
  //       ));
  //}

  GetMedicamentos(){
    this.medicamentos =  this.historialService.getMedicamentos();
    }

    GetHistMedicPaciente(){
      this.historial = this.historialService.getHistorialPaciente();
    }

    DeleteMedicPaciente(id){
      this.historialService.deleteHistPaciente(id).subscribe(data=>{
        console.log(data);
        this.GetHistMedicPaciente();
      })
    }

    AddMedicamentoToHist(){            
      this.insumoPaciente.createdAt = new Date();
      this.insumoPaciente.id_usu=9999;
      this.insumoPaciente.hora;
      var newdate = new Date();    
      
      this.historialService.addMedicamentoHist(this.insumoPaciente).subscribe(res=>{       
       this.insumoPaciente.dosis = "";
       this.insumoPaciente.id_prod = "";
       this.insumoPaciente.hora = new Date();

       this.GetHistMedicPaciente();
      });   
      
    }
  }

  export class HistDataSource extends DataSource<any> {
    constructor(private historialService: HistorialService) {
      super();
    }
    connect(): Observable<historial_medicamentos[]> {
      return this.historialService.getHistorialPaciente();
    }
    disconnect() {}
  }


