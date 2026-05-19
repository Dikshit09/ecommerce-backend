const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/authRoutes")

const app = express()
app.use(express.json())
app.use(cors({
    origin: [
        "https://p01-puce.vercel.app",
        "http://localhost:5173"
    ]
}))

app.use("/api/auth",authRoutes)


module.exports = app