import React, {useEffect, useState} from 'react'
import axios from 'axios'

import { appStateUrl} from './routes'
const TIMEOUT = 1000 // milisegundos en hacer petición (1000ms = 1s)
function App() {
  const [state, setState ] = useState(null)
  const [recarga, setRecarga] = useState(0)
  // cuando se monta 

  useEffect( ()=> {

    const timer = setTimeout(() => {
      axios.get(appStateUrl)
      .then( res => {
        setState(res.data)
        console.log(res.data)
        //return res.data
        setRecarga(recarga+1)
      })
      .catch( (err) => {
        console.log(err)
      })
  }, TIMEOUT);
  return () => clearTimeout(timer)
  })


  return (
    <div className="App">
      <h1> Página debugeo de state</h1>

      Peticiones desde que se lanzó la página al backend :{recarga} <br/>
      <h2> La información que contiene el estado </h2>
      View: {state?.view} <br/>
      Select: {state?.select}
    </div>
  );
}

export default App;
