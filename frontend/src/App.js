import React, {useEffect, useReducer} from 'react'
import axios from 'axios'
import RouterWrapper from './routes'
import { appStateUrl} from './routesURL'
import { storeReducer, Store } from './store'
import { initialStore , ActionTypes} from './gestor'

const TIMEOUT = 1000 // milisegundos en hacer petición (1000ms = 1s)

function App() {
  
  const [state, dispatch] = useReducer( storeReducer, initialStore)

  return (
    <Store.Provider value={state}>
      <RouterWrapper />
    </Store.Provider>
  );
}

export default App;
