const express = require('express')
const app = express()
const port = 3500
const path = require("path")

const finalPath = path.join(__dirname,"/public/1_dataandapis.html")

app.get('/', (req, res) => {
  //res.send('Hello World! , froom root side')

  
  res.sendFile(finalPath)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// app.use(express.static('public'))