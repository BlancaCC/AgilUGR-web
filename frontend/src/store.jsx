import React, {createContext, useMemo, useState} from "react";
import { gestorValorInicial } from "./gestor";

export const store = createContext(gestorValorInicial)
const {Provider} = store

export const StateProvider = ({children}) => {
    const [state, dispatch] = useState(gestorValorInicial)

    // getters 
    const getters = useMemo( () =>

    )

    // Los estados, dispathc (lo que lo actualizan)
    // los getters de la base de datos se actualizan solo si cambian
    const value = useMemo (() => (
        {state, dispatch, getters}
    ), [state, dispatch, getters])
    return (
        <Provider value={value}>
            {children}
        </Provider>
    )
}