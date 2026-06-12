if(process.env.NODE_ENV != "Production"){
    require("dotenv").config();
}

const express=require("express");
const app=express();
const mongoose=require('mongoose');
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore = require('connect-mongo').default;
const flash=require("connect-flash");
const passport = require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");



const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

const dbUrl=process.env.ATLASDB_URL || process.env.MONGO_URI;
const port=process.env.PORT || 8080;
const sessionSecret=process.env.SESSION_SECRET || "mysupersecretcode";

if(!dbUrl){
    throw new Error("ATLASDB_URL is not defined in .env");
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const store= MongoStore.create({
    mongoUrl: dbUrl,
    collectionName:"sessions",
    crypto:{
        secret:sessionSecret,
    },
    touchAfter: 24 * 3600,
});

store.on("error",(err)=>{
    console.log("Error in mongo session store",err);
})

const sessionOptions={
    store,
    secret:sessionSecret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7,
        httpOnly:true
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main()
   .then(()=>{
         console.log("connected to database successfully");
         app.listen(port,()=>{
             console.log(`server is listening on port ${port}`);
         });
   })
   .catch((err)=>{
            console.log("error connecting to database",err);
   })

async function main(){
    await mongoose.connect(dbUrl);
}

// app.get("/",(req,res)=>{
//     res.send("i am root")
// })

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

// app.get("/demouser",async (req,res)=>{
//     let fakeuser=new User({
//         email:"abc@gmail.com",
//         username:"abc12334",
//     });
//     let newuser=await User.register(fakeuser,"helloworld");
//     res.send(newuser); 
// })

//listings routes
app.use("/listings",listingRouter);

//review routes
app.use("/listings/:id/reviews",reviewRouter);

//user routes
app.use("/",userRouter);



app.use((req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})


app.use((err,req,res,next)=>{
    let {statusCode=500,message="something occured"}=err;
    res.status(statusCode).render("error.ejs",{err});
})

