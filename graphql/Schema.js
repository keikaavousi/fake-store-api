const { buildSchema } = require("graphql");

// @todo - remove mutations
const schema = buildSchema(`
  scalar Date

  type Product {
    id: Int!
    title: String!
    price: Int!
    description: String!
    image: String!
    category: String!
  }
  type Cart {
    id: Int!
    userId: Int!
    date: Date!
    products: [CartProducts]
  }
  type CartProducts {
    productId: Int!
    quantity: Int!
  }

  type Query {
    getAllProducts(sort: String, limit: Int): [Product]
    getProduct(id: Int!): Product
    getProductCategories: [String]
    getProductsInCategory(category: String!, sort: String, limit: Int): [Product]
  }
`);

module.exports = schema;

// getAllCarts(sort: String, limit: Int, startdate: Date, enddate: Date): [Cart]
// getCartsbyUserid(userId: Int!, startdate: Date, enddate: Date): [Cart]
// getSingleCart(id: Int!): Cart
