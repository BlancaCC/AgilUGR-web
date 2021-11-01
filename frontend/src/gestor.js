import { profileURL } from "./routesURL"

/** 
interface IState {
    vista: string, 
    action: String,
    counter: number
}
*/
export const initialStore = {
    view: profileURL, // url de la vista
    counter: 0, //número de peticiones hechas 
    action: null,
}

// Valores válidos para la API. 

//Acciones válidas que se le pasarán a la API
export const ActionTypes = {
    actualizaVista : 'ActualizaVista',
    dentroVista : 'dentroVista',
    sumaContador : 'sumaContador',
}