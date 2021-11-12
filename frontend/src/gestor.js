import { profileURL } from "./routesURL"
/** 
interface IState {
    vista: string, 
    action: String,
    counter: number
}
*/
export const timeActionStates = {
    parado : 'PARADO',
    seleccionado : 'SELECCIONADO',
    en_movimiento : 'EN-MOVIEMIENTO',
}
export const initialStore = {
    view: profileURL, // url de la vista
    counter: 0, //número de peticiones hechas 
    action: 0,  // refleja el estado el tiempo
    tiempo: 2, // indíce del vector de tiempo seleccionado
    // descomentar uno de timeAction para probarlo
    timeAction: timeActionStates.en_movimiento//'SELECCIONADO',//'PARADO', // otra opción sería seleccionado 
    // timeAction: 'PARADO',
}
//Acciones válidas que se le pasarán a la API
export const ActionTypes = {
    actualizaVista : 'ActualizaVista',
    dentroVista : 'dentroVista',
    sumaContador : 'sumaContador',
    subidaGeneral: 'subidaGeneral',
}

