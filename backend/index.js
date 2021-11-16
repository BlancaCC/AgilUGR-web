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
// --------- backend con mariadb 

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '172.17.0.2', 
     user:'root', 
     password: 'pass',
     connectionLimit: 5
});
/** Función auxiliar de lectura de la base de datos */
async function asyncFunctionGET(res) {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT * FROM agil.webState; ");
  console.log(`Lee ${rows[0]}`)
  res.send(rows[0])
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}
async function asyncFunctionPUTView(view) {
  let conn;
  try {

	conn = await pool.getConnection();

	const res = await conn.query(
    `UPDATE agil.webState SET 
    view = '${view}'
    WHERE id=1;`
  );
	// res: { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) conn.release(); //release to pool
  }
}

async function asyncFunctionPUTTime(time) {
  let conn;
  try {

	conn = await pool.getConnection();

	const res = await conn.query(
    `UPDATE agil.webState SET 
    indice_tiempo = ${time}
    WHERE id=1;`
  );
	// res: { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) conn.release(); //release to pool
  }
}

async function asyncFunctionPUTAction(action) {
  let conn;
  try {

	conn = await pool.getConnection();

	const res = await conn.query(
    `UPDATE agil.webState SET 
    time_action = '${action}'
    WHERE id=1;`
  );
	// res: { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) conn.release(); //release to pool
  }
}




// lead lo que recibe
app.get('/mariadb', (req, res)=>{
  const {view} = req.params
  // TODO control de la corrección 
  asyncFunctionGET(res).then(obj => {
    console.log(`Petición get Mariadb aceptada con éxito :D`)
  })
  .catch(err => console.error(err))
})
// vista 
app.put('/mariadb/view/:view', (req, res)=>{
  const {view} = req.params
  asyncFunctionPUTView(view).then(obj => {
  console.log(`PUT LEAD state: ${view}`)
  res.send(`Put view updated ${view}`)
  })
  .catch(err => console.error(err))
})
// time
app.put('/mariadb/time/:time', (req, res)=>{
  const {time} = req.params
  asyncFunctionPUTTime(time).then(obj => {
  console.log(`PUT LEAD state: ${time}`)
  res.send(`Put view updated ${time}`)
  })
  .catch(err => console.error(err))
})

app.put('/mariadb/action/:action', (req, res)=>{
  const {action} = req.params
  asyncFunctionPUTAction(action).then(obj => {
  console.log(`PUT LEAD state: ${action}`)
  res.send(`Put view updated ${action}`)
  })
  .catch(err => console.error(err))
})





// Esto es dónde escribe el puerto
app.listen(port, () => {
  console.log(`Agil UGR listening at http://localhost:${port}`)
})
