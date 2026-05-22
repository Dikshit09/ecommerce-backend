const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")
const swaggerDocs = require('../swagger')
const swaggerUi = require('swagger-ui-express')


const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(cors({
    origin: process.env.LIVE_URI ||  "http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRoutes)


module.exports = app