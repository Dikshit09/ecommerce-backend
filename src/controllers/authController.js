const User = require("../model/login_signup")
const bcryprt = require("bcrypt")

const signup = async(req,res) =>{
    try{
        const {name,email,password} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(400).json({message:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User.create({
            name,
            email,
            password:hashedPassword
        })
        res.status(201).json({message:"User created successfully" })
    }catch(err){
        res.status(500).json({message:"Internal server error",err})
    }
}



const login = async(req,res) => {
    try{
        const {email,password} = req.body

        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message:"Invalid email or password"})
        }

        const isMatch =  await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({message:"Invalid email or password"})
        }
    }catch(err){
        res.status(500).json({message:"Internal server error",err})
    }
}

module.exports = {signup,login}