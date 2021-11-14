const fs = require('fs-extra')
const express = require('express')

const { leapFile } = require( './actualizaLeapState')


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
})

/**Put general para hacer subidas :)*/
app.put('/general/:attribute/:value', (req, res)=>{
  const {attribute, value} = req.params
  // TODO control de la corrección 
  const state = fs.readJSON(file, {throws: false})
  .then(obj => {
  
  // actualizamos el valor del Json
  const newState = obj
  newState[attribute] = value
  res.send(`State update now is  ${JSON.stringify(newState)}`)
  console.log(`PUT GENEARL Read stat: ${JSON.stringify(newState)}`)
  return newState
  })
  .then(obj => {
    fs.writeJson(file, obj)
    return obj
  })
  .then((obj) => {
    console.log(`PUT accepted. GENERAL updated ${JSON.stringify(obj)}`)
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
// lead lo que recibe
app.put('/leap/:view', (req, res)=>{
  const {view} = req.params
  // TODO control de la corrección 
  const state = fs.readJSON(file, {throws: false})
  .then(obj => {
  console.log(`PUT LEAD state: ${JSON.stringify(obj)}`)
  const newState =  {...obj,"leap": view}
  res.send(`State update now is  ${JSON.stringify(newState)}`)
  return newState
  })
  .then(obj => fs.writeJson(file, obj))
  .then(() => {
    console.log(`PUT accepted. VIEW updated`)
  })
  .catch(err => console.error(err))
})

// Esto es dónde escribe el puerto
app.listen(port, () => {
  console.log(`Agil UGR listening at http://localhost:${port}`)
})
