import React, {useEffect, useReducer} from 'react'
import axios from 'axios'
import RouterWrapper from './routes'
import { appStateUrl} from './routesURL'
import { storeReducer, Store } from './store'
import { initialStore , ActionTypes} from './gestor'
import  Leap from 'leapjs'   // '   //leap-1.1.1.js'

const TIMEOUT = 1000 // milisegundos en hacer petición (1000ms = 1s)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  
  const [state, dispatch] = useReducer( storeReducer, initialStore)
  const hello = () => {
    //alert('hola')
    dispatch({type: ActionTypes.subidaGeneral, ...{'view': 'stats'}})
  }
  // cuando se monta 
  useEffect( () => {

    var vista = 'focus'
    // inicio codiguillo 
    var previousFrame = null;
    var paused = false;
    var pauseOnGesture = false;
    

    // Setup Leap loop with frame callback function
    var controllerOptions = {enableGestures: true};

    // to use HMD mode:
    // controllerOptions.optimizeHMD = true;
    var controller = new Leap.Controller();
    controller.connect();
    
    controller.on('frame', onFrame);
    function onFrame(frame)
    { 
      //hello()
      dispatch({type: ActionTypes.subidaGeneral, ...{'view': 'stats'}})
      sleep(10000)
    }
    
    /*Leap.loop(controllerOptions, function(frame) {
   
      vista = 'stats'
      dispatch({type: ActionTypes.subidaGeneral, ...{'view': 'stats'}}) 
      return ; 
      
    })
    */
    // fin del codiguillo
    dispatch({type: ActionTypes.subidaGeneral, ...{'view': vista}})
    hello()
  })
  /** 
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
  */
  return (
    <Store.Provider value={state}>
      <RouterWrapper />
    </Store.Provider>
  );
}

export default App;
