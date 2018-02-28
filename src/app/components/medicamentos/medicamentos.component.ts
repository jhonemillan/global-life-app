import { EmitterService } from './../../services/emitter.service';

import { Paciente } from './../../models/pacientes';
import { historial_medicamentos } from './../../models/historial_medicamentos';
import { Observable } from 'rxjs/Rx';
import { HistorialService } from './../../historial.service';
import { Medicamento } from './../../models/medicamento';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {MatTableDataSource, MatIconModule} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCard } from '@angular/material';
import { MatSelectChange } from "@angular/material";
import { ValoracionEnfermeria } from '../../models/valoracion';
import { Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { catchError, map, tap,startWith, switchMap, 
  debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit {
  @Input() paciente: Paciente;
  medicamentos: Observable<Medicamento[]>;
  insumoPaciente = {} as historial_medicamentos;
  historial: Observable<historial_medicamentos[]>;
  valoracion: ValoracionEnfermeria = {} as any; 
  filteredMedicamentos: Observable<any>;
  myControl: FormControl = new FormControl(); 
  consulta = false;
  
  puntajeTotalBraden = 0;
  totalBarthel: number = 0;
  ThemeBraden;
  MsgBradenTheme;
  ThemeBarthel;
  MsgBarthel;
  
  constructor(private historialService: HistorialService,
              private dataService: EmitterService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {    

    this.route.params.subscribe((params) =>{
      console.log('entra');

      if (params['id_visita']) {
        this.consulta = true;
        this.valoracion = this.dataService.getVisita();        
        console.log(this.valoracion);
      }

    });

    if(!this.consulta){
      this.route.queryParams.subscribe((params)=>{      
        if(params['id'])
        {
          this.valoracion.iden_pac = params['id'];
          this.crearVisitaBasica();        
        }
        else{
          console.log('cancelada');
          this.Cancelar();
        }

        if(params['id_usu']){
          this.valoracion.id_usu = params['id_usu'];
        }
        
      });
    }

    
    this.cargarFiltrosMedicamentos();
    this.GetMedicamentos();
    this.GetHistMedicPaciente();
    this.valoracion.pielIntegra = false;

  }

  cargarFiltrosMedicamentos(){
    this.filteredMedicamentos = this.myControl.valueChanges
        .pipe(
          startWith(null),
          debounceTime(200),           
          switchMap(val => {           
            return this.filter(val || '')
          })       
        );
  }

  filter(val: string): Observable<any[]> {
    return this.medicamentos
    .pipe(
      map(response => response.filter(option => {       
        return option.nom_prod.toLowerCase().indexOf(val.toLowerCase()) > -1
      }))
    )
  }

  crearVisitaBasica(){
    this.valoracion.Fecha = new Date();
    this.valoracion.id_usu = this.dataService.getIdPro();
    this.historialService.addValoracionPaciente(this.valoracion).subscribe(res=>{
    this.valoracion.Id_ValSegEnf= res.Id_ValSegEnf;      
    });  
  }


    onSelectChange(event: MatSelectChange){
      this.puntajeTotalBraden = Number(this.valoracion.percepcion_sensorial) + Number(this.valoracion.exposicion_humedad) + Number(this.valoracion.actividad)
                  + Number(this.valoracion.movilidad) + Number(this.valoracion.nutricion) + Number(this.valoracion.friccion_cizallamiento);
                  
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

    OnSelectChangeBartel(event: MatSelectChange){
      
       this.totalBarthel = Number(this.valoracion.banarse) +
                                         Number(this.valoracion.comer) +
                                         Number(this.valoracion.usar_retrete) +
                                         Number(this.valoracion.subir_escalera) +
                                         Number(this.valoracion.vestirse) +
                                         Number(this.valoracion.ctrl_deposicion) +
                                         Number(this.valoracion.ctrl_miccion) +
                                         Number(this.valoracion.caminar) + 
                                         Number(this.valoracion.traslado_silla_cama)

                                         console.log(this.totalBarthel)
      

                                         if(this.totalBarthel <= 40){
                                          this.ThemeBarthel = "alert alert-danger"
                                          this.MsgBarthel = "Alta Dependencia";
                                        }
                      
                      
                                        if(this.totalBarthel >= 41 && this.totalBarthel <= 55){
                                          this.ThemeBarthel = "alert alert-warning"
                                          this.MsgBarthel = "Dependencia Moderada";
                                        }
                      
                                        if(this.totalBarthel >= 56 && this.totalBarthel <= 99){
                                          this.ThemeBarthel = "alert alert-info"
                                          this.MsgBarthel = "Dependencia Leve";
                                        }
                      
                                        if(this.totalBarthel > 99){
                                          this.ThemeBarthel = "alert alert-success"
                                          this.MsgBarthel = "Independiente";
                                        }
    }



    GetMedicamentos(){
    this.medicamentos =  this.historialService.getMedicamentos();
    }

    GetHistMedicPaciente(){
      this.historial = this.historialService.getHistorialPaciente(this.valoracion.Id_ValSegEnf);
    }

    DeleteMedicPaciente(id){
      this.historialService.deleteHistPaciente(id).subscribe(data=>{
        console.log(data);
        this.GetHistMedicPaciente();
      })
    }

    getMedicamentoFromAuto(medicamento: historial_medicamentos){
      this.insumoPaciente = medicamento;
    }

    AddMedicamentoToHist(){            
      this.insumoPaciente.createdAt = new Date();
      this.insumoPaciente.id_usu=9999;
      this.insumoPaciente.Id_ValSegEnf = this.valoracion.Id_ValSegEnf;
      
      this.historialService.addMedicamentoHist(this.insumoPaciente).subscribe(res=>{       
       this.insumoPaciente.dosis = "";
       this.insumoPaciente.id_prod = "";      
       this.insumoPaciente.hora = "";
       this.GetHistMedicPaciente();
      });   
      
    }

    Cancelar(){
      this.router.navigate(['/selectuser'])
      this.valoracion.iden_pac = '';
    }   

    SaveValoracion(){
          
      this.valoracion.puntajeTotal_Braden = this.puntajeTotalBraden;
      this.valoracion.puntajeTotal_val = this.totalBarthel;
      
      // this.historialService.addValoracionPaciente(this.valoracion).subscribe(res=>{
      //   console.log(res);
      //   this.valoracion = {} as any;
      // });

      this.historialService.updateValoracionPaciente(this.valoracion).subscribe(res=>{
        console.log(res);
      });
    }
  }



