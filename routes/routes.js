const express =require("express");
const router=express.Router();
const Book=require('../Models/book');
const addProfile=require('../Models/profile')
const multer=require('multer');



var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
     cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname)
    }
});

//middleware
var upload=multer({
    storage:storage,
}).single("image");

//Insert book in database
router.post('/Add',upload, async (req,res)=>{
    const book=new Book({
        bookname:req.body.bookname,
        authorname:req.body.authorname,
        price:req.body.price,
        summary:req.body.summary,
        image:req.file.filename,
        mark:false
    });
    try{
        await book.save();
        res.redirect("/Add");
    }catch(error)
    {
        console.log(error);
    }
    

})
//get all data
router.get("/",async(req,res)=>{
    let data=await Book.find();
    res.render('index',{
        title:'Home page',
        books:data,
    });
})
// show book which borrow
router.get("/Profile",async(req,res)=>{
    let data=await addProfile.find();
    res.render('user_profile',{
        title:'Profile',
        addBook:data
    });
})

//borrow book
router.get("/Profile/:id",async(req,res)=>{
    let result=await Book.findOne({_id:req.params.id})
    const borrow=new addProfile({
        bookname:result.bookname,
        authorname:result.authorname,
        price:result.price,
        summary:result.summary,
        image:result.image,
        bookId:req.params.id
    });
   let data=await Book.updateOne(
        { _id: req.params.id },
        { mark: true }
      );
    borrow.save();
    res.redirect("/") ;
})
//return book
router.get("/Home/:id",async(req,res)=>{
    const data=await addProfile.findOne({_id:req.params.id});
    await addProfile.deleteOne({_id:req.params.id})
    let result=await Book.updateOne(
        { _id: data.bookId },
        { mark: false }
      );
    res.redirect("/Profile");
})
//add book details
router.get("/Add",(req,res)=>{
    res.render("add_book",{title:"Add Book"})
})

module.exports = router;