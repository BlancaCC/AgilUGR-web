import React, { useContext } from "react";
import { Store } from "../store";
const Debug = () => {

  const store = useContext(Store)
  return (
    <div>
    <h1> Página debugeo de state</h1>

    Peticiones desde que se lanzó la página al backend :{store.counter} <br/>
    <h2> La información que contiene el estado </h2>
    View: {store.view} <br/>
    Select: {store.action}
  </div>
  )
}

export default Debug