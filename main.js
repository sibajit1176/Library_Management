require('dotenv').config();
const express=require('express');
const mongoose=require('mongoose');
const session=require('express-session');



const app=express();
const PORT=process.env.PORT || 6000;

// make Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
    secret:'Library_ManageMent-System',
    saveUninitialized:true,
    resave:false
}))

app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
})
app.use(express.static("uploads"))


//templet engine
app.set('view engine','ejs');


//Database conection
mongoose.connect(process.env.DB_URI).then(()=>{
    console.log("Dtabase conect");
}).catch((error)=>{
    console.log(error);
});


//routes

app.use("",require('./routes/routes'))
app.use("",require('./routes/userRoutes'))
app.listen(PORT, ()=>{
    console.log(`Server start at http://localhost:${PORT}`);
})