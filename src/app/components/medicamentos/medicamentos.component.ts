import { historial_medicamentos } from './../../models/historial_medicamentos';
import { Observable } from 'rxjs/Rx';
import { HistorialService } from './../../historial.service';
import { Medicamento } from './../../models/medicamento';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {MatTableDataSource, MatIconModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCard } from '@angular/material';
import { MatSelectChange } from "@angular/material";

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
  PercepcionSelected: number = 0;
  HumedadSelected: number = 0;
  ActividadSelected: number = 0;
  MovilidadSelected: number = 0;
  NutricionSelected: number = 0;
  FriccionSelected: number = 0;
  dataSource = new HistDataSource(this.historialService);
  comment;
  puntajeTotalBraden = 0;
  ThemeBraden;
  MsgBradenTheme;
  clasificacionRiesgos= [{"Alto":"Alto Riesgo"},
                         {"Moderado": "Riesgo Moderado"},
                         {"Bajo": "Bajo Riesgo"},
                         {"No":"Sin Riesgo"}];
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

  onSelectChange(event: MatSelectChange){
    this.puntajeTotalBraden = Number(this.PercepcionSelected) + Number(this.HumedadSelected) + Number(this.ActividadSelected)
                  + Number(this.MovilidadSelected) + Number(this.NutricionSelected) + Number(this.FriccionSelected);
                  
                  if(this.puntajeTotalBraden <= 12){
                    this.ThemeBraden = "alert alert-danger"
                    this.MsgBradenTheme = "Alto Riesgo";
                  }


                  if(this.puntajeTotalBraden >= 13 && this.puntajeTotalBraden <= 14){
                    this.ThemeBraden = "alert alert-warning"
                    this.MsgBradenTheme = "Riesgo Moderado";
                  }

                  if(this.puntajeTotalBraden >= 15 && this.puntajeTotalBraden <= 16){
                    this.ThemeBraden = "alert alert-info"
                    this.MsgBradenTheme = "Bajo Riesgo";
                  }

                  if(this.puntajeTotalBraden > 16){
                    this.ThemeBraden = "alert alert-success"
                    this.MsgBradenTheme = "Sin Riesgo";
                  }
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
     
      
      this.historialService.addMedicamentoHist(this.insumoPaciente).subscribe(res=>{       
       this.insumoPaciente.dosis = "";
       this.insumoPaciente.id_prod = "";      
       this.insumoPaciente.hora = "";
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


