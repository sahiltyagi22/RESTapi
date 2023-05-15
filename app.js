const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine' , 'ejs')
app.use(express.static("public"))

// const reqParser = bodyParser.json()
app.use(bodyParser.urlencoded({extended :true}))

// SETTING UP DATABASE

mongoose.connect("mongodb://127.0.0.1/wikiDB")
.then(()=>{
    console.log("DB coonnection is successful");
}).catch((err)=>{
console.log(err);
})

const blogSchema = mongoose.Schema({
    title : String,
    content : String,
})

const blogMODEL = mongoose.model('blogModel' , blogSchema)


// ADDING ROUTES

app.get('/' , (req , res)=>{
    res.send("this is the home route , please visit /articles route to get to the articles page ")
})


app.get('/articles' ,(req , res)=>{
    blogMODEL.find().then((foundArticle)=>{
        // console.log(foundArticle);
    res.send(foundArticle)

    }).catch((err)=>{
        res.send(err)
    })
   })

   app.post('/articles' , (req ,res)=>{
    console.log(req.body.title)
    console.log(req.body.content)

    const newArticle = new blogMODEL({
        title : req.body.title,
        content : req.body.content

    })

    newArticle.save().then(()=>{
        res.send("new article has been created")
    }).catch((err)=>{
        console.log(err);
    })

   })









app.listen(3000 , ()=>{
    console.log("server is up and running on port 3000");
})