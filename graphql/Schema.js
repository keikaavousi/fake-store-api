const { buildSchema } = require("graphql");

const schema = buildSchema(`

  type Query {
  }

  type Mutation {
  }
`);

module.exports = schema;
