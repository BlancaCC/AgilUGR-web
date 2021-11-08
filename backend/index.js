const fs = require('fs-extra')
const express = require('express')
const app = express()

const port = 8000

// some configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Guarda el estado actual del proyecto
// TODO definir estructura 
const file = './state.json'
const state = fs.readJSON(file, {throws: false})
.then(obj => {
  console.log(`Read state: ${JSON.stringify(obj)}`)
  return obj
})
.catch(err => console.error(err))
// para que permita las referencias cruzadas 
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// cuando se pregunta por raiz se devuelve el estado actual de la app
app.get('/', (req, res) => {
  
  const state = fs.readJSON(file, {throws: false})
  .then(obj => {
    console.log(`Read state: ${JSON.stringify(obj)}`)
    res.send(obj)
    return obj
  })
  .catch(err => console.error(err))
  console.log(`GET ${req.hostname} ${JSON.stringify(state)}`)
  
})

app.post('/leap', (req, res)=>{
  // añadir parámetro a detectar
  const {mano, gesto} = req.body
  console.log(`recibe petición de put mano: ${mano} gesto: ${gesto}`)
 
  // TODO control de la corrección 
  const state = fs.readJSON(file, {throws: false})
  .then(obj => {
  // escribir los parámetros que se quieren detectar
  const newState =  {...obj, ...req.body}
    // mano: mano, gesto: gesto}
  console.log(`POST  UPATE TO: ${JSON.stringify(newState)}`)
  res.send(`State update now is  ${JSON.stringify(newState)}`)
  return newState
  })
  .then(obj => fs.writeJson(file, obj))
  .then(() => {
    console.log(`State updated correctly`)
  })
  .catch(err => console.error(err))
})



app.put('/view/:view', (req, res)=>{
  const {view} = req.params
  // TODO control de la corrección 
  const state = fs.readJSON(file, {throws: false})
  .then(obj => {
  console.log(`PUT Read state: ${JSON.stringify(obj)}`)
  const newState =  {...obj,"view": view}
  res.send(`State update now is  ${JSON.stringify(newState)}`)
  return newState
  })
  .then(obj => fs.writeJson(file, obj))
  .then(() => {
    console.log(`PUT accepted. VIEW updated`)
  })
  .catch(err => console.error(err))
})


// Detectar posición eje x del dedo meñique
app.put('/leap/:view', (req, res)=>{
  const {view} = req.params
  // TODO control de la corrección 
  const state = fs.readJSON(file, {throws: false})
  .then(obj => {
  console.log(`PUT Read state: ${JSON.stringify(obj)}`)
  const newState =  {...obj,"dedo": view}
  res.send(`State update now is  ${JSON.stringify(newState)}`)
  return newState
  })
  .then(obj => fs.writeJson(file, obj))
  .then(() => {
    console.log(`PUT accepted. VIEW updated`)
  })
  .catch(err => console.error(err))
})



//Esto es del puerto en el que escucha. NO DUPLICAR O FALLARÁ por intentar acceder doble al puerto
app.listen(port, () => {
  console.log(`Agil UGR listening at http://localhost:${port}`)
})
