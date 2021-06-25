const express = require("express");
const app = express();
var cors = require("cors");
const port = 3000;
const userData = require("./mock_data.json");
const graphql = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const { GraphQLObjectType, GraphQLSchema, GraphQLInt } = graphql;
const { GraphQLString, GraphQLList } = graphql;

app.use(cors()); // Enables CORS for all origins

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    ipAddress: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        ipAddress: { type: GraphQLString },
      },
      resolve(parents, args) {
        userData.push({ id: userData.length + 1, ...args });
        return args;
      },
    },
  },
});

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
