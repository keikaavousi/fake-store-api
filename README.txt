GET:
/products                                           get all products
/products/1                                         get specific product based on id
/products?limit=5                                   limit return results 
/products?sort=desc                                 asc|desc  get products in ascending or descending orders (default to asc)
/products/category/jewelery                         get all products in specific category
/products/category/jewelery?sort=desc               asc|desc  get products in ascending or descending orders (default to asc)

POST:
/products                                          post dummy product, you can post a product with this schema:
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    category:{
        type:String
    }
    if it will post correctly, it will return a fake id based on length of all products (products length+1) together with your product object sent.
    remember that your data won't insert into our database and if you refresh your page (eg. in web applications) it will no longer in fetched datas.              

PUT:
/products                   edit a product, you should send an id and it will return you the selected product. remember that this api only work with id passed, otherwise it will return an error.


DELETE:
/products                   delete a product, you should send an id and it will return you the selected product. remember that this api only work with id passed, otherwise it will return an error.
