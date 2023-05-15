const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')

const app = express()

app.set('view engine' , 'ejs')
app.use(express.static("public"))

mongoose.connect("mongodb://127.0.0.1/wikiDB")
.then(()=>{
    console.log("DB coonnection is successful");
}).catch((err)=>{
console.log(err);
})









app.listen(3000 , ()=>{
    console.log("server is up and running on port 3000");
})