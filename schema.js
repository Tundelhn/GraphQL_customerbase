const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const customers = [
  {
    id: 1,
    name: 'tunde',
    email: 'Ayodele@gmail.com',
    age: 34
  },
  {
    id: 2,
    name: 'seyi',
    email: 'Ayodeleolumide@gmail.com',
    age: 36
  },
  {
    id: 3,
    name: 'tunde',
    email: 'seyiolumide@gmail.com',
    age: 33
  }
];

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    customer: {
      type: CustomerType,
      description: 'single customer',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parentValue, args) => {
        for (var i = 0; i < customers.length; i++) {
          if (customers[i].id === args.id) {
            return customers[i];
          }
        }
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
