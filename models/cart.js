var mongoose=require("mongoose");

var cartSchema =  mongoose.Schema({
	items:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Product"
	}],
	owner:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
	amount:Number
});

module.exports=mongoose.model("Cart",cartSchema);
