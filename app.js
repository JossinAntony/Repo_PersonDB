const Express = require('express');
const Mongoose = require('mongoose');
const request = require('request');
const bodyParser = require('body-parser');

var app = new Express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(process.env.PORT || 3046,()=>{
    console.log("Server running at http://localhost:3046")
});
