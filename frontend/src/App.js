import React, {useEffect, useReducer} from 'react'
import axios from 'axios'
import RouterWrapper from './routes'
import { appStateUrl} from './routesURL'
import { storeReducer, Store } from './store'
import { initialStore , ActionTypes} from './gestor'

const TIMEOUT = 1000 // milisegundos en hacer petición (1000ms = 1s)

function App() {
  
  const [state, dispatch] = useReducer( storeReducer, initialStore)

  // cuando se monta 
  useEffect( ()=> {
    const timer = setTimeout(() => {
      axios.get(appStateUrl)
      .then( res => {
        // dispatch({type: ActionTypes.actualizaVista, view: res.data.view})
        console.log(` Los datos del res en store,jsx son ${res.data}`)
        dispatch({type: ActionTypes.subidaGeneral, ...res.data})
        dispatch({type: ActionTypes.sumaContador})
      })
      .catch( (err) => {
        console.log(err)
      })
  }, TIMEOUT);
  return () => clearTimeout(timer)
  })

  return (
    <Store.Provider value={state}>
      <RouterWrapper />
    </Store.Provider>
  );
}

export default App;
