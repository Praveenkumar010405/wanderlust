const User=require("../models/user.js");



module.exports.signupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signupPost=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser= new User({email,username});
        const registeruser=await User.register(newUser,password);
        console.log(registeruser);
        req.login(registeruser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to wanderlust");
            return res.redirect("/listings");
        })
    }catch(e){
        req.flash("error",e.message);
        return res.redirect("/signup");
    }
}


module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.loginPost=async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust");
    let redirecturl=res.locals.redirectUrl || "/listings"
    return res.redirect(redirecturl);
}


module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out!");
        return res.redirect("/listings");
    })
}