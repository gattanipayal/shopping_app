var mongoose=require("mongoose"),
	passportLocalMongoose=require("passport-local-mongoose");

var userSchema=new mongoose.Schema({
	username:{type:String,required:true,unique:true},
	email:{type:String,match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],unique:true,required:true},
	password:String,
	country:String,
	pincode:Number,
	phone:Number,
	cart:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Cart"
	}
});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);



