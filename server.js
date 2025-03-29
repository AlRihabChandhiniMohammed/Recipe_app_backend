const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require ('bcryptjs')
const app=express()
const PORT=3000
app.use(express.json());
mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("DB connected Successfully...")
).catch(
    (err)=>console.log(err)
)
app.get('/',async(req,res)=>{
    try{
            res.send("<h2 style='color:blue;text-align:center'>Welcome to the MERN Stack | Week 2 | Backend</h2>")
    }
    catch(err)
    {
        console.log(err)
    }
});
app.post('/register',async(req,res)=>{
    const {Username,email,password}=req.body
    try{
        const hashPassword=await bcrypt.hash(password,10)
            const newUser=new User({Username,email,password:hashPassword})
            await newUser.save()
            console.log("User Registration Completed....")
            res.json({message:"User Registered.."})
            
    }
    catch(err)
    {
        console.log(err)
    }
});
app.post('/login',async(req,res)=>{
    const{email,password}=req.body
    try{
        const user=await User.findOne({email});
        if(!user||!(await bcrypt.compare(password,user.password)))
        {
            return res.status(400).json({message:"Invalid Credentials"});
        }
        res.json({message:"Login Successful",Username:user.Username});

    }
    catch(err)
    {
        console.log(err)
    }
})
app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("Server is Running on port:"+PORT)
});