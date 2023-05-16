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

app.route('/articles')
.get((req , res)=>{
    blogMODEL.find().then((foundArticle)=>{
        // console.log(foundArticle);
    res.send(foundArticle)

    }).catch(()=>{
        res.send("ARTICLE NOT FOUND")
    })
   })


   .post((req ,res)=>{
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


   .delete((req , res)=>{
    blogMODEL.deleteMany().then(()=>{
        res.send("all the articles has been deleted")
    }).catch((err)=>{
        res.send(err)
    })
   })


   app.route('/articles/:titleName')
   .get((req,res)=>{
    blogMODEL.findOne({title :req.params.titleName}).then((foundArticle)=>{
        res.send(foundArticle)
    })
      .catch((err)=>{
        res.send(err)
      })
    })
   .post((req,res)=>{
    const article = new blogMODEL({
        title :req.body.title,
        content : req.body.content
    })

    article.save().then(()=>{
        res.send("article has been saved")
    }).catch((err)=>{
        res.send(err)
    })
   })
   .put((req,res)=>{
   blogMODEL.updateOne(
    {title : req.params.titleName}, 
       { title : req.body.title , content : req.body.content}
    ).then(()=>{
        res.send("data upated")
    })
   })

// .patch((req,res)=>{
//     blogMODEL.update(
//         {title : req.body.titleName},
//         {$set :req.body}
//     )
// })


.delete((req,res)=>{
    blogMODEL.deleteMany({}).then(()=>{
        res.send('articles has been deleted')
    }).catch((err)=>{
        res.send(err)
    })
})





app.listen(3000 , ()=>{
    console.log("server is up and running on port 3000");
})