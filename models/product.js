var mongoose=require("mongoose");

var productSchema = new mongoose.Schema({
	_id:{
		type:mongoose.Types.ObjectId
	},
	image:{
		type:String,
		required:[true,"k"]},
	title:{
		type:String,
		required:true},
	description:{
		type:String,
		required:true},
	price:Number,
	category:String,
	stock:Number,
	size:String,
	reviews:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Review"
	}]
});

module.exports=mongoose.model("Product",productSchema);
