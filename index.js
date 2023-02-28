const express=require('express')
const app=express()
const conn=require('./connection/conn')
const contact=require('./models/contacts')
conn()
app.use(express.json())

app.post('/v1/contacts',async(req,res)=>{
    let {firstname,lastname,email,phone}=req.body
    try{
    const data=await contact.create({firstname,lastname,email,phone})
    res.status(201).json({data})
    }
    catch(err){
        return res.status(400).json({message:err.message})
    }
})

app.get('/v1/contacts',async(req,res)=>{
    let data=await contact.find({})
    res.status(200).json(data)
})
app.get('/v1/contacts/:id',async(req,res)=>{
    let {id}=req.params
    try{
        let data=await contact.find({_id:id})
        
        if(data.length){
            res.status(200).json(data)
        }
        else{
            res.status(404).json({error:"There is no contact with that id"})
        }
    }
    catch(err){
        return res.status(404).json({message:err.message})
    }
  
})

app.delete('/v1/contacts/:id',async(req,res)=>{
    let {id}=req.params
    let data=await contact.deleteOne({_id:id})
    return res.status(204).json({message:'None'})
})

app.put('/v1/contacts/:id',async(req,res)=>{
    let {id}=req.params
    let {firstname,lastname,email,phone}=req.body
    let result=await contact.find({_id:id})
    if(result.length)
    {
    try{
    let data=await contact.updateOne({_id:id},{$set : {firstname,lastname,email,phone}})
     res.status(204).json({data})
    }
    catch(err){
        return res.status(404).json({error:err.message})
    } }
    else{
        res.status(404).json({error:"There is no contact with that id"})
    }
})
app.patch('/v1/contacts/:id',async(req,res)=>{
    let {id}=req.params
    let {firstname,lastname,email,phone}=req.body
    let result=await contact.find({_id:id})
    console.log(result)
    if(result.length){
    try{
     let data=await contact.updateOne({_id:id},{$set : {firstname,lastname,email,phone}})
     res.status(204).json({data})
    }
    catch(err){
        return res.status(404).json({error:err.message})
    }}
    else{
        res.status(404).json({error:"There is no contact with that id"})
    }
})
app.listen(4000)