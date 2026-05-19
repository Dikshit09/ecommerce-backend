const jwt = require("jsonwebtoken")
const User = require("../model/login_signup")
const bcrypt = require("bcrypt")

const signup = async(req,res) =>{
    try{
        const {name,email,password} = req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(400).json({message:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await User.create({
            name,
            email,
            password:hashedPassword
        })
        const token = jwt.sign({
            id: newUser._id,
            email: newUser.email
        },process.env.JWT_SECRET,
        {expiresIn:"7d"}
    )

    res.status(201).json({
        message: "User created successfully",
        token,
        user:{
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
    })
    }catch(err){
        res.status(500).json({message:"Internal server error",err})
    }
}

const login = async(req,res) => {
    try{
        const {email,password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid email or password"})
        }

        const isMatch =  await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"})
        }
        const token = jwt.sign({
            id: user._id,
            email: user.email
        },
    process.env.JWT_SECRET,
        {expiresIn:"7d"}
)
res.status(200).json({
    message: "Login successful",
    token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
})    
    }catch(err){
        res.status(500).json({message:"Internal server error",err})
    }
}


const getAllUsers = async(req,res) => {
    try{
        const users = await User.find().select("-password")
        res.status(200).json({users})
    }catch(err){
        res.status(500).json({message:"Internal server error",err})
    }
}

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    
    res.status(200).json({
      totalUsers,
    })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error })
  }
}

module.exports = {signup,login,getAllUsers,getStats}