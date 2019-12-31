var express=require("express"),
	app=express(),
	bodyParser=require("body-parser");
	mongoose=require("mongoose"),
	Product=require("./models/product"),
	Cart=require("./models/cart"),
	Wishlist=require("./models/wishlist"),
	Review=require("./models/review"),
	passport=require("passport"),
	localStrategy=require("passport-local"),
	User=require("./models/user"),
	seedDB=require("./seed");

var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
//seedDB();

mongoose.connect("mongodb://localhost/shopping_app")

app.use(bodyParser.urlencoded({extended:true,useNewUrlParser: true}));

app.use(express.static(__dirname+"/public"));

app.set("view engine","ejs");

app.use(require("express-session")({
	secret:"hi there",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});

app.get("/",function(req,res){
	res.render("home");
});

app.get("/products/:category",function(req,res){
	Product.find({category:req.params.category},function(err,allProducts){
		if(err){
			console.log(err);
		}else{
			res.render("index",{products:allProducts});
		}
	});
});

app.get("/show/:id",function(req,res){
	var Id = new ObjectId(req.params.id);
	Product.findOne({_id:Id},function(err,foundProduct){
		if(err){
			console.log(err);
		}else{
			res.render("show",{product:foundProduct});
		}
	});
});

app.post("/cart/add/:id",isLoggedIn,function(req,res){
	Cart.findOne({owner:req.user},function(err,foundCart){
		//console.log(req.user);
		if(err){
			console.log(err);
		}else{
			Product.findById(req.params.id,function(err,foundProduct){
				if(!err){
					foundProduct.size=req.body.size;
					if(foundCart.items==null){
						Cart.create({owner:req.user,amount:0},function(err,newCart){
							if(err){
								console.log(err);
							}else{
								newCart.items.push(foundProduct);
								newCart.amount=foundProduct.price;
								newCart.save();
								res.redirect("/");
							}
						});
					}else{
						foundCart.amount+=foundProduct.price;
						foundCart.items.push(foundProduct);
						foundProduct.save();
						foundCart.save();
						res.redirect("/");
					}
				}
			});
		}
	});
});

app.get("/cart/show",isLoggedIn,function(req,res){
	Cart.findOne({owner:req.user}).populate("items").exec(function(err,foundCart){
		if(err){
			console.log(err);
		}else{
			res.render("cart_show",{cart:foundCart});
		}
	});
});

app.get("/wishlist/add/:id",isLoggedIn,function(req,res){
	Wishlist.findOne({owner:req.user},function(err,foundWishlist){
		if(err){
			console.log(err);
		}else{
			Product.findById(req.params.id,function(err,foundProduct){
				if(!err){
					if(foundWishlist.items==null){
						Wishlist.create({owner:req.user},function(err,newWishlist){
							if(err){
								console.log(err);
							}else{
								newWishlist.items.push(foundProduct);
								newWishlist.save();
								res.redirect("/");
							}
						});
					}else{
						foundWishlist.items.push(foundProduct);
						foundWishlist.save();
						res.redirect("/");
					}
				}
			});
		}
	});
});

app.get("/wishlist/show",isLoggedIn,function(req,res){
	Wishlist.findOne({owner:req.user}).populate("items").exec(function(err,foundWishlist){
		if(err){
			console.log(err);
		}else{
			res.render("wishlist_show",{wishlist:foundWishlist});
		}
	});
});

///auth routes

app.get("/register",function(req,res){
	res.render("register");
});

app.post("/register",function(req,res){
	var newUser=new User(
	{
		username:req.body.username, 
		email:req.body.email, 
		phone:req.body.phone, 
		country:req.body.country,
		pincode:req.body.pincode
	});
	console.log(req.body);
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/");
		});
	});
});

app.get("/login",function(req,res){
	res.render("login");
});

//app.post("/login",middleware,callback)
app.post("/login",passport.authenticate("local",
	{
		successRedirect:"/",
		failureRedirect:"/login"
	}),function(req,res){
});

app.get("/logout",function(req,res){
	req.logout();
	res.redirect('/posts');
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


app.listen(3000,function(){
	console.log("Server has started!!");
});















