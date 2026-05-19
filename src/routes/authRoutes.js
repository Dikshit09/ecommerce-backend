const express = require("express")
const router = express.Router()
const {signup,login, getAllUsers,getStats} = require("../controllers/authController")

router.post("/signup",signup)
router.post("/login",login)
router.get("/users", getAllUsers)
router.get('/stats', getStats)

module.exports = router