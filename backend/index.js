
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// cuando se pregunta por raiz se devuelve el estado actual de la app
app.get('/', (req, res) => {
  res.send(state)
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
