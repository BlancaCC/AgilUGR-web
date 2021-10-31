
const express = require('express')
const app = express()
const port = 8000

// Guarda el estado actual del proyecto
// TODO definir estructura 
const  state = {
  view: 'home', 
  select: 'blabla'
}
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
