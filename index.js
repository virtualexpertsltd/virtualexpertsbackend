// const multer = require('multer');
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
const headerInfoTopServices = require('./routes/headerInfoTopService')
const headerInfoVirtualExports = require('./routes/headerInfoVirtualExports')
const banner = require('./routes/banner')
const about = require('./routes/about')
const aboutMission = require('./routes/aboutMission')
const aboutUnique = require('./routes/aboutUnique')
const aboutUniqueList = require('./routes/aboutUniqueList')
const aboutTeam = require('./routes/aboutTeam')
const virtualService = require('./routes/whyChooseVirtualExports')
const placeAnOrder = require('./routes/placeAnOrder')
const placeAnOrderList = require('./routes/placeAnOrderList')
const whatWeDo = require('./routes/whatWeDo')
const footer = require('./routes/footer')
const footerLink = require('./routes/footerLink')
const order = require('./routes/order')
const invoice = require('./routes/invoice')
const testimonials = require('./routes/testimonials')
const serviceCardHeader = require('./routes/serviceCardHeader')
const amazon = require('./routes/amazon')
const adminLogin = require('./routes/adminLogin')
const team = require('./routes/team')
const scheduleMeeting = require('./routes/scheduleMeeting')
const topServices = require('./routes/topServices')
const dbConnect = require('./Utilities/dbConnect');
const amazonFBA = require('./routes/amazonFBA');
const fbaDesc1 = require('./routes/fbaDesc1');
const whyShouldHire = require('./routes/whyShouldHire');
const fbaService = require('./routes/fbaService');
const contactForm = require('./routes/contactForm');
const leads = require('./routes/leads');
const blogs = require('./routes/blog');


// Meta Section
const metaHome = require('./routes/metaHome')
const metaService = require('./routes/metaService')
const metaBlog = require('./routes/metaBlog')
const metaAbout = require('./routes/metaAbout')
const metaLetsTalk = require('./routes/metaLetsTalk');
const metaFBA = require('./routes/metaFBA');


 dbConnect();

app.use('/headerInfoTopServices', headerInfoTopServices)
app.use('/headerInfoVirtualExports', headerInfoVirtualExports)
app.use('/virtualService', virtualService)
app.use('/banner', banner)
app.use('/servicesCard', servicesCardRoute)
app.use('/about', about)
app.use('/aboutMission', aboutMission)
app.use('/aboutUnique', aboutUnique)
app.use('/aboutUniqueList', aboutUniqueList)
app.use('/aboutTeam', aboutTeam)
app.use('/placeAnOrder', placeAnOrder)
app.use('/placeAnOrderList', placeAnOrderList)
app.use('/whatWeDo', whatWeDo)
app.use('/footer', footer)
app.use('/footerLink', footerLink)
app.use('/order', order)
app.use('/invoice', invoice)
app.use('/testimonials', testimonials)
app.use('/serviceCardHeader', serviceCardHeader)
app.use('/amazon', amazon)
app.use('/adminLogin', adminLogin)
app.use('/teams', team)
app.use('/scheduleMeeting', scheduleMeeting)
app.use('/topServices', topServices)
app.use('/amazonfba', amazonFBA)
app.use('/fbadesc1', fbaDesc1)
app.use('/whyshouldhire', whyShouldHire)
app.use('/fbaservice', fbaService)
app.use('/contactform', contactForm)
app.use('/leads', leads)
app.use('/blogs', blogs)


// Meta Section
app.use('/metaHome', metaHome)
app.use('/metaService', metaService)
app.use('/metaBlog', metaBlog)
app.use('/metaAbout', metaAbout)
app.use('/metaLetsTalk', metaLetsTalk)
app.use('/metaFBA', metaFBA)



app.get('/', (req, res) => {
  res.send('Hello Buddy!!!')
})

app.listen(process.env.PORT || PORT,() => {
  console.log(`Listen to Port ${PORT}`.white.bgGreen);
})
