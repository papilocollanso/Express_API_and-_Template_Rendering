const express= require('express');
const path=require('path');
const bodyParser=require('body-parser');
const app= express();
var exphbs  = require('express-handlebars'); 
const logger=require('./middleware/logger');
const member=require('./members');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//init middleware
app.use(logger);

//memebers create route
app.use('/api/members',require('./Route/api/members'));


//render view
app.get('/',(req,res)=>{
res.render('index',{
    title:'Member App',
    member
});

});

//serve from static files  
app.use(express.static(path.join(__dirname,"public")));



//use body parser middleware
//app.use(express.bodyParser());
//app.use(express.json());
//app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//reder temp
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');




const port=process.env.port || 5000;
app.listen(port,()=>(
    console.log(`express server running at ${port}`)
));