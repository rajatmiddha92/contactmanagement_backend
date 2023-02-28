const mon=require('mongoose')

const conn=async()=>{
await mon.connect(`mongodb://localhost:27017/contacts`)
}
module.exports=conn