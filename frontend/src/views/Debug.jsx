import React, { useContext } from "react";
import { Store } from "../store";
import {ViewURL} from '../routesURL'
const Debug = () => {

  const store = useContext(Store)
  return (
    <div>
    <h1> Página debugeo de state</h1>

    Peticiones desde que se lanzó la página al backend :{store.counter} <br/>
    <h2> La información que contiene el estado </h2>
    View: {store.view} <br/>
    Action: {store.action}  <br/>
    Tiempo : {store.indice_tiempo}  <br/>
    timeAction : {store.timeAction}  (Valores posibles PARADO, SELECCIONADO)<br/>
    <br/>
    Los valores posibles de view:  <br/> 
      profile: {ViewURL.profile} <br/> 
      focus: {ViewURL.focus} <br/> 
      stats: {ViewURL.stats} <br/> 
      debug: {ViewURL.debug} <br/> 
  </div>
  )
}

export default Debug