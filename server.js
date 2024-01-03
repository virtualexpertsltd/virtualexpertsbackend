const express = require('express')
const cors = require('cors')
const colors = require('colors');
const app = express()
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
require('dotenv').config()
app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use(fileUpload())

const PORT = 5000

const servicesCardRoute = require('./routes/servicesCard')

const team = require('./routes/team')
const about = require('./routes/about')
const aboutUnique = require('./routes/aboutUnique')
const aboutTeam = require('./routes/aboutTeam');
const dbConnect = require('./Utilities/dbConnect');





dbConnect();

// server
// const port = process.env.PORT || 8080;

app.use('/servicesCard', servicesCardRoute)
app.use('/teams', team)
app.use('/about', about)
app.use('/aboutUnique', aboutUnique)
app.use('/aboutTeam', aboutTeam)

app.get('/', (req, res) => {
  res.send('Hello Buddy!!!')
})

app.listen(process.env.PORT || PORT,() => {
  console.log(`Listen to Port ${PORT}`.white.bgGreen);
})
