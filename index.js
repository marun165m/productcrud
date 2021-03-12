var express=require('express');
var mongoose=require('mongoose');
var User=require('./Models/User');
var Product=require('./products/productlist');

var bodyparser=require('body-parser');
var db=require('./Mysetup/myurls').myurl;
var app=express();

var urlencodedParser = bodyparser.urlencoded({ extended: false });
// app.use(bodyparser.urlencoded({extended:false}));
var jsonparser=bodyparser.json();


mongoose.connect(db).then(()=>{
    console.log("Database is connected");
}).catch(err=>{
    console.log("Error is "+ err.message);
})


app.get('/',function(req,res){
    res.status(200).send("Hi, welcome to the Sign-Up and Log-In page");

});



app.post('/signin',jsonparser,function(req,res){

    var userCred={};

    userCred.email=req.body.email;
    userCred.password=req.body.password;

    User.findOne({email:userCred.email},function(err,profile){

        if(!profile){
            return res.status(500).send("User not exist");
        }
        else{
            console.log(profile);
            console.log(profile.email);
            console.log(profile.password);
            if (userCred.password == profile.password && userCred.email==profile.email){
                return res.status(200).json({success:true,message:"User authenticated"});
            }
            else if(userCred.password != profile.password ){
                return res.status(500).json({success:false,message:"password is incorrect.Please try again"});
            }
            else if(userCred.email != profile.email){
                return res.status(500).json({success:false,message:"Email not exist.Create account"});
            }
            else{
                return res.status(500).json({success:false,message:"Unautherized access"});
            }
            // bcrypt.compare(userCred.password,profile.password,function(err,result){
                // if(err){
                //     return res.status(500).send("Password does not match");
                // }
                // else if(result==true){
                //     return res.status(200).json({success:true,message:"User authenticated"});
                // }
                // else{
                //     return res.status(500).json({success:false,message:"Unautherized access"});
                // }

        }

    });

});




app.get('/product/list',function(req,res){

   Product.find({},function(err,profile){
       if(err){
            return res.status(500).json({error:true,message:"product not listed"});
        }
        else{
            
            return res.status(200).json({success:true,message:"product is listed",data :profile});
 
            
        }

    });

});

















app.post('/signup',jsonparser,function(req,res){

    var newuser= new User(req.body);

    // console.log(req);
    // console.log(req.body);

    
    // if(lnewuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
    User.findOne({email:newuser.email},function(err,user){
        if(user){
            return res.status(500).json({auth:false,message:"email exist"});
        }
        console.log(newuser);
        newuser.save((err,doc)=>{
            if(err){
                console.log(err);
                return res.status(500).json({success:false,message:"User not created"});
            }
                return res.status(200).json({success:true,message:"User created",user : doc});

        });
    });
    


});





app.post('/product/create',jsonparser,function(req,res){

    var newuser= new Product(req.body);

    // console.log(req);
    // console.log(req.body);

    
    // if(lnewuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
    Product.findOne({pid:newuser.pid},function(err,user){
        if(user){
            return res.status(500).json({auth:false,message:"product exist"});
        }
        console.log(newuser);
        newuser.save((err,doc)=>{
            if(err){
                console.log(err);
                return res.status(500).json({success:false,message:"User not created"});
            }
                return res.status(200).json({success:true,message:"User created",user : doc});

        });
    });
    


});

//     var newuser=new User({
//         fullname:req.body.fullname,
//         email:req.body.email,
//         phone:req.body.phone,
//         password:req.body.password
//     });
//     await newuser.save().then(()=>{
        
//         response={
//             // status:status(200),
//             success:true,
//             Message:"User signup is success"
//         }
//         res.send(JSON.stringify(response));

//     }).catch((err)=>{
        
//         console.log(err.message);
//         response={
//             // status:status(500),
//             success:false,
//             Message:"User signup is failed!"
//         }
//         res.send(JSON.stringify(response));
//     });

// });



app.listen(6000,function(){
    console.log("Port 6000 is listening");
});