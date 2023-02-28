const mongoose=require('mongoose')
const schema=mongoose.Schema

const contactsSchema=new schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String,required:true, unique:true},
    phone:{type:Number,required:true,unique:true}
})

const contact=mongoose.model('contacts',contactsSchema)

module.exports=contact