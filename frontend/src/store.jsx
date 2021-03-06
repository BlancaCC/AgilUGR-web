import {createContext} from "react";
import { initialStore, ActionTypes} from "./gestor";

export const Store = createContext(initialStore)

/**
 * 
 * @param {*} state 
 * @param {*} action : tipo de mensaje que se envía. 
 * Tipo: 'Actualiza vista' por ejemplo. 
 * vista: 
 */
export const storeReducer = ( state , action ) => {
    switch ( action.type) {
        case ActionTypes.actualizaVista:
            return {...state, view: '/'+action.view}
        case ActionTypes.sumaContador:
            return {...state, counter: state.counter +1}
        // la idea sería quedarse solo con este dispatch general
        case ActionTypes.subidaGeneral: 
            return {...state, ...action, view: '/'+action.view, }
        default:
            throw new Error()
    }
}