// subdirectory
const express = require('express')
const app = express()
const port = 3500
const path = require("path")

const path_one = path.join(__dirname,"/public/1_dataandapis.html")
const path_two = path.join(__dirname,"/public/page1.html")

app.get('/', (req, res) => {
  //res.send('Hello World! , froom root side')
  
  res.sendFile(path_one)
  res.sendFile(path_two)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//app.use(express.static('public'))