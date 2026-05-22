const express = require("express")
const router = express.Router()
const {signup,login, getAllUsers,getStats} = require("../controllers/authController")

router.post("/login",login)
router.get("/users", getAllUsers)
router.get('/stats', getStats)
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/signup",signup)

module.exports = router