var mongoose=require("mongoose");

var wishlistSchema =  mongoose.Schema({
	items:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Product"
	}],
	owner:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	}
});

module.exports=mongoose.model("Wishlist",wishlistSchema);
