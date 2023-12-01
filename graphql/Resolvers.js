const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const Product = require("../model/product");

const resolvers = {
  getAllProducts: async (params) => {
    const { sort, limit } = params;
    try {
      const response = await Product.find()
        .sort({
          id: sort === "desc" ? -1 : 1,
        })
        .limit(limit || 0);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  getProduct: async (id) => {
    try {
      const response = await Product.findOne(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  getProductCategories: async () => {
    try {
      const response = await Product.distinct("category");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  getProductsInCategory: async (params) => {
    const { category, sort, limit } = params;
    try {
      const response = await Product.find({ category })
        .select(["-_id"])
        .limit(limit || 0)
        .sort({ id: sort === "desc" ? -1 : 1 });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  // @todo - might remove...used for testing purposes only
  // addProduct: async (body) => {
  //   try {
  //     const response = await Product.create(body);
  //     return response;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // },
  getAllCarts: async (params) => {
    try {
      const { sort, limit, startdate, enddate } = params;
      const startDate = startdate || new Date("1970-1-1");
      const endDate = enddate || new Date();
      const response = await Cart.find({
        date: { $gte: new Date(startDate), $lt: new Date(endDate) },
      })
        .select("-_id -products._id")
        .limit(limit || 0)
        .sort({ id: sort === "desc" ? -1 : 1 });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  getCartsbyUserid: async (params) => {
    try {
      const { userId, startdate, enddate } = params;
      const response = await Cart.find({
        userId,
        date: { $gte: new Date(startdate), $lt: new Date(enddate) },
      }).select("-_id -products._id");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  getSingleCart: async (id) => {
    try {
      const response = await Cart.findOne({ id }).select("-_id -products._id");
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  addCart: async (params) => {
    try {
      // @todo - need to remove this
      const response = await Cart.create(req.body);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const DateResolver = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};

module.exports = { resolvers, DateResolver };
