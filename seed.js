var mongoose=require("mongoose");
var Product=require("./models/product");
var Review=require("./models/review");

var data=[
	{
		title:"black dress",
		image:"https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"blah blah blah",
		price:1000,
		category:"Women",
		stock:100
	},
	{
		title:"black top",
		image:"https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"blah blah blah",
		price:1000,
		category:"Women",
		stock:100
	},
	{
		title:"black shirt",
		image:"https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"blah blah blah",
		price:1000,
		category:"Men",
		stock:100
	},
	{
		title:"black pant",
		image:"https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"blah blah blah",
		price:1000,
		category:"Men",
		stock:100
	}
]

function seedDB(){
	Product.remove({},function(err){
		console.log("remove products");
	});
	data.forEach(function(seed){
		Product.create(seed, function(err,product){
			if(err){
				console.log(err);
			}else{
				console.log("added a product");
				Review.create(
				{
					text:"goood",
					author:"homer"	
				},function(err,review){
					if(err){
						console.log(err);
					}else{
						product.reviews.push(review);
						product.save();
						console.log("added a review");
					}
				});
			}
		});
	});
}

module.exports = seedDB;