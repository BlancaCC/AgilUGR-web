import React, {useEffect, useReducer} from 'react'

import RouterWrapper from './routes'
import { storeReducer, Store } from './store'
import { initialStore , ActionTypes} from './gestor'
import  Leap from 'leapjs' 

import {NumeroDedosAbiertos} from './leap'

/********
 * 
 * -->


var previousFrame = null;
var paused = false;
var pauseOnGesture = false;

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

// to use HMD mode:
// controllerOptions.optimizeHMD = true;

Leap.loop(controllerOptions, function(frame)
 * 
 * 
 */




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
  /*useEffect( () => {

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
      hello()
      var numDedos = NumeroDedosAbiertos (frame?.pointables)
      if (state.tiempo !== numDedos){
        dispatch({type: ActionTypes.subidaGeneral, ...{'tiempo': numDedos, 'view':'focus'}})
      }
    }
  })*/

  var previousFrame = null;
  var paused = false;
  var pauseOnGesture = false;
  
  // Setup Leap loop with frame callback function
  var controllerOptions = {enableGestures: true};
  
  // to use HMD mode:
  // controllerOptions.optimizeHMD = true;
  
  Leap.loop(controllerOptions, function(frame){
    if (paused) {
      return; // Skip this update
    }
    hello()
    var numDedos = NumeroDedosAbiertos (frame?.pointables)
    if (state.tiempo !== numDedos){
      dispatch({type: ActionTypes.subidaGeneral, ...{'tiempo': numDedos, 'view':'focus'}})
    }
  })

  
  return (
    <Store.Provider value={state}>
      <RouterWrapper />
    </Store.Provider>
  );
}

export default App;
