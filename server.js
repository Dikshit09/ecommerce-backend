require("dotenv").config()
const app = require("./src/app")
const mongoose = require("mongoose")


mongoose.connect(process.env.MONGO_URI)
     .then(() => {
        console.log("connected to database")
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})