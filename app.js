const Express = require('express');
const Mongoose = require('mongoose');
const request = require('request');
const bodyParser = require('body-parser');

var app = new Express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

Mongoose.connect('mongodb://localhost:27017/PersonDB');
//Mongoose.connect('mongodb+srv://jossin:jossin@cluster0-arjkd.mongodb.net/test?retryWrites=true&w=majority'); //mongodb cloudatlas add, remener to change password

////////////////////////////////////////////////
//define dataschema
const formSchema = Mongoose.model('formdetails',
{
    uname:String,
    umail:String,
    umob:String,
    umsg:String
}
);
////
//define save API upon save button
app.post('/saveInfo',(req,res)=>{
    var details = req.body;
    var person = new formSchema(details);
    var result = person.save((error, data)=>{
        if (error){
            throw error;
        }else{
            //res.send('employee record created @' + data);
            res.send("<script>alert('New record created!')</script>");
        }
    });
});

////define retrievel API
app.get('/retrieveInfo',(req,res)=>{
    var retrieve = formSchema.find((error,data)=>{
        if (error){
            throw error;
        }else{
            res.send(data);
        }
    });
});

///get link to the retrievel API
const retrieveDataApi = "http://localhost:3046/retrieveInfo"
//const retrieveDataApi = "https://employeedb-jossin.herokuapp.com/retrieveInfo"

///call the API in a function to retieve the data
app.get('/viewpersons',(req,res)=>{
    request(retrieveDataApi,(error, response, body)=>{
        if (error){
            throw error;
        }else{
            var data= JSON.parse(body);
            res.send(data);
        }
    });
});
/////////////////////////////////////////////////////
//define the API to get a singleperson

app.get('/searchByMobAPI/',(req,res)=>{
    var prsnmob = req.query.q;
    console.log(prsnmob)
    formSchema.find({umob:prsnmob}, (error, data)=>{
        if(error){
            throw error;
        }else{
            res.send(data);
        }
    });
});

//define API link
const searchByNameAPILink = 'http://localhost:3046/searchByMobAPI'
//const searchByNameAPILink = "https://employeedb-jossin.herokuapp.com/retrieveInfo"

//use in function to retrieve data
app.post('/searchPerson',(req,res)=>{
    item = req.body.smob;
    console.log(item);
    request(searchByNameAPILink+"/?q="+ item, (error, response, body)=>{
        if(error){
            throw error;
        }else{
            //var data = JSON.parse(body);
            console.log(body);
            //res.send(data);
        } 
    });
});


app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/searchperson',(req,res)=>{
    res.render('searchperson');
})

app.listen(process.env.PORT || 3046,()=>{
    console.log("Server running at http://localhost:3046")
});