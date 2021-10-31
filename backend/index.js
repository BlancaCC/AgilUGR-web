
const express = require('express')
const app = express()
const port = 8000

// Guarda el estado actual del proyecto
// TODO definir estructura 
const  state = {
  view: 'home', 
  select: 'blabla'
}
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
  res.send(state)
  console.log(`GET ${req.header}`)
})

app.put('/view/:view', (req, res)=>{
  const {view} = req.params
  // TODO control de la corrección 
  state.view = view
  res.send(`View updated with ${view}`)
  console.log(`PUT accepted. VIEW updated with ${view}`)

})

app.listen(port, () => {
  console.log(`Agil UGR listening at http://localhost:${port}`)
})
