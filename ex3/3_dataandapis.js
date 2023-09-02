const { log } = require('console')
const express = require('express')
const app = express()
const port = 3500
const path = require("path")

const finalPath = path.join(__dirname,"/public/3_dataandapis.html")

app.use(express.json({limit:'1mb'}))

app.get('/', (req, res) => {
  //res.send('Hello World! , froom root side')
  res.sendFile(finalPath)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/api', (request,response) =>{
  data = request.body

  response.json({
    status: 'Success',
    latitude: data.lat,
    longitude: data.lon
  })
})