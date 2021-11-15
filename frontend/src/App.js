import React, {useEffect, useReducer} from 'react'

import RouterWrapper from './routes'
import { storeReducer, Store } from './store'
import { initialStore , ActionTypes} from './gestor'
import  Leap from 'leapjs'
// import Leap from 'http://js.leapmotion.com/leap-0.6.3.min.js';


import {NumeroDedosAbiertos, Indica,  VISTAS_STRUCTURA,  VISTAS_ARRAY, ValorIndice} from './leap'

var FRAMES = []
const TIMEOUT = 2*1000000 // segundos
var lastChange = -100000000
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
    // Setup Leap loop with frame callback function
    var controllerOptions = {enableGestures: true};

    // to use HMD mode:
    // controllerOptions.optimizeHMD = true;
    var controller = new Leap.Controller({enableGestures:true});
    controller.connect();
    
    
    controller.on('frame', onFrame);
    /*controller.on('gesture', (g,f)=> {
      dispatch({type: ActionTypes.actualizaVista, ...{'view': g.type}})
    }
    )*/

    function onFrame(frame)
    { 
      var numDedos = NumeroDedosAbiertos (frame?.pointables)
      
      const indice = Indica(
        [frame?.pointables[1]?.direction[0],
        frame?.pointables[2]?.direction[0],
        frame?.pointables[3]?.direction[0],
        frame?.pointables[4]?.direction[0]])

      FRAMES.push({mi_frame: frame, numeroDedos : numDedos, indice : indice})

      if (FRAMES.length>2) {
        FRAMES.shift();
      }
      //alert(ValorIndice(FRAMES))
      // Cambio general 
      if ( ValorIndice(FRAMES) !== 0 && Math.abs(frame.timestamp - lastChange) > TIMEOUT) {

        const indice_vista_actual = VISTAS_STRUCTURA[state.view] 

        var  indice_nueva_vista = Math.abs((indice_vista_actual + indice) % 3)

        if( indice_nueva_vista <0) {
          indice_nueva_vista = 2
        }

        //alert(  Math.abs(frame.timestamp - lastChange))
        const nueva_vista = VISTAS_ARRAY[indice_nueva_vista]
        //alert(nueva_vista)
        dispatch({type: ActionTypes.actualizaVista, ...{view: nueva_vista}})
        lastChange = frame.timestamp
        
        
      }
      // focus  
      //if (state.view === '/focus'){
        if (state.tiempo !== numDedos){
          dispatch({type: ActionTypes.tiempo, ...{tiempo:  numDedos}})
        }
      //}
    }
  })
  
  return (
    <Store.Provider value={state}>
      <RouterWrapper />
    </Store.Provider>
  );
}

export default App;
