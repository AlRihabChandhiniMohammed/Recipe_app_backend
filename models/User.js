const mongoose=require('mongoose')
const UserSchema=mongoose.Schema({
    Username:{type:String,require:true},
    email:{type:String,require:true,Unique:true},
    password:{type:String,require:true}
})

module.exports=mongoose.model('User',UserSchema)