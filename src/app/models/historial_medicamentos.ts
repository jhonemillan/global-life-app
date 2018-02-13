export interface historial_medicamentos{
    id_MedxSeg: number,
    dosis: string,
    hora: string,
    id_prod: string,
    id_usu?: number
    createdAt?: Date,
    medicamento: {nom_prod:string},
    Id_ValSegEnf?:number

}