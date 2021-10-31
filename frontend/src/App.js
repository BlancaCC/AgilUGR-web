import React, {useEffect, useState} from 'react'
import axios from 'axios'

import { appStateUrl} from './routes'

function App() {
  const [state, setState ] = useState(null)
  // cuando se monta 

  useEffect( ()=> {
    axios.get(appStateUrl, 
      {
        headers:{
          'Access-Control-Allow-Origin': '*'
        }
      })
    .then( res => {
      setState(res.data)
      console.log(res.data)
      //return res.data
    })
    .catch( (err) => {
      console.log(err)
    })
  })

  return (
    <div className="App">
      <h1> Hello world</h1>
      El estado leído es: 
      {state}
    </div>
  );
}

export default App;
