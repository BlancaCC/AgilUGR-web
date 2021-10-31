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
  <h2> Working on provider</h2>
  );
}

export default App;
