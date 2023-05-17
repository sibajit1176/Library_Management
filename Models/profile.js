const mongoose=require('mongoose');
const profileSchema=new mongoose.Schema({
    bookname:{
        type:String,
        required:true,
    },
    authorname:{
        type:String,
        required:true
    },
    price:{
    type:String,
    required:true
    },
    summary:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    bookId:{
        type:String,
        required:true
    }
    
})
module.exports=mongoose.model("profile",profileSchema);