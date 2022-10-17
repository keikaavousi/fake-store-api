const Product = require('../model/product');

module.exports.getAllProducts = (req, res) => {
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Product.find()
		.select(['-_id'])
		.limit(limit)
		.sort({ id: sort })
		.then((products) => {
			res.json(products);
		})
		.catch((err) => console.log(err));
};

module.exports.getProduct = (req, res) => {
	const id = req.params.id;

	Product.findOne({
		id,
	})
		.select(['-_id'])
		.then((product) => {
			res.json(product);
		})
		.catch((err) => console.log(err));
};

module.exports.getProductCategories = (req, res) => {
	Product.distinct('category')
		.then((categories) => {
			res.json(categories);
		})
		.catch((err) => console.log(err));
};

module.exports.getProductsInCategory = (req, res) => {
	const category = req.params.category;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Product.find({
		category,
	})
		.select(['-_id'])
		.limit(limit)
		.sort({ id: sort })
		.then((products) => {
			res.json(products);
		})
		.catch((err) => console.log(err));
};

module.exports.addProduct = (req, res) => {
	if (typeof req.body == undefined) {
		res.json({
			status: 'error',
			message: 'data is undefined',
		});
	} else {
		// let productCount = 0;
		// Product.find()
		//   .countDocuments(function (err, count) {
		//     productCount = count;
		//   })
		//   .then(() => {
		const product = {
			id: 21,
			title: req.body.title,
			price: req.body.price,
			description: req.body.description,
			image: req.body.image,
			category: req.body.category,
		};
		// product.save()
		//   .then(product => res.json(product))
		//   .catch(err => console.log(err))
		res.json(product);
		// });
	}
};

module.exports.editProduct = (req, res) => {
	const productId = req.params.id;
	if (typeof req.body == undefined || req.params.id == null) {
		res.json({
			status: 'error',
			message: 'something went wrong! check your sent data',
		});
	} else {

		const updatedProduct = {
		title: req.body.title,
		price: req.body.price,
		description: req.body.description,
		image: req.body.image,
		category: req.body.category
		}

		Product.updateOne({id:productId},updatedProduct)
				.then(()=>{
					res.status(200).json({message:"Product Updated."})
				})
				.catch((err)=>{
					res.status(409).json({message :"Failed! Reason : "+err.message});
				})

		
	}
};

module.exports.deleteProduct = (req, res) => {
	if (req.params.id == null) {
		res.json({
			status: 'error',
			message: 'cart id should be provided',
		});
	} else {

		Product.deleteOne({
			id: req.params.id,
		})
			.select(['-_id'])
			.then((product) => {
				res.json({message:"Product deleted"});
			})
			.catch((err) => res.json({menubar:"Failed! Reason : "+err.message}));
	}
};
