require('dotenv').config()
const path = require('path')
const express = require('express')
const session = require('express-session')
const authRoutes = require('./routes/authenticationRoutes')
// const unAvaiblityRoutes = require('./routes/unAvaiblityRoutes')
// const appointmentRoutes = require('./routes/appoinmentsRoutes')
// const busyTimeRoutes = require('./routes/busyTimesRoute')
const cors = require('cors')
const connectToMongoDB = require('./config/db')
// const passport = require('passport')

const app = express()
// app.use(session({ secret: "cats" }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: true }
// }))

app.use(cors())

// database connexion
connectToMongoDB()

const port = process.env.PORT || 5050
// const port =  5050

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', authRoutes)
// app.use('/api', unAvaiblityRoutes)
// app.use('/api/appointments', appointmentRoutes)
// app.use('/api/busy-times', busyTimeRoutes)

// serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './', 'client', 'build', 'index.html'))
  })
}
else{
  app.get('/', (req, res) => {
    res.send("Please set to production")
  })
}

app.listen(port, () => console.log("The server is running on port : ", port))