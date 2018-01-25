export interface ValoracionEnfermeria{    
    Fecha: Date, 
    pielIntegra: boolean,
    observacion_Piel?: string,
    percepcion_sensorial?: number, 
    exposicion_humedad? : number, 
    actividad?: number,
    movilidad?: number,
    nutricion?: number,
    friccion_cizallamiento?:  number,
    puntajeTotal_Braden?: number,
    observaciones_Braden?: string
    
}