const Listing=require("../models/listing")

module.exports.index=async (req,res)=>{
    const allListings = await Listing.find({});
    return res.render("listings/index.ejs",{allListings})
};

module.exports.new=(req,res)=>{
    return res.render("listings/new.ejs");
}

module.exports.show=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","Sorry!, Listing you requested for does not exist")
        return res.redirect("/listings")
    }
    return res.render("listings/show.ejs",{listing});
}


module.exports.create=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    const newlisting = new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={url,filename};
    await newlisting.save();
    req.flash("success","New listing created!")
    return res.redirect("/listings");
}


module.exports.edit=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    req.flash("success","Listing edited!")
    if(!listing){
        req.flash("error","Sorry!, Update page you requested for does not exist")
        return res.redirect("/listings")
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/ar_1.0,c_fill,h_250/")
    return res.render("listings/edit.ejs",{listing,originalImageUrl});
}

module.exports.update=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }

    req.flash("success","Listing updated!")
    return res.redirect(`/listings/${id}`)
}


module.exports.delete=async(req,res) => {
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!")
    return res.redirect("/listings")
}