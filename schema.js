const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');
const axios = require('axios');

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
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
        id: { type: GraphQLString }
      },
      resolve: (parentValue, args) => {
        // for (var i = 0; i < customers.length; i++) {
        //   if (customers[i].id === args.id) {
        //     return customers[i];
        //   }
        // }
        return axios
          .get(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      description: 'list of customers',
      resolve: (parentValue, args) => {
        return axios
          .get(`http://localhost:3000/customers`)
          .then(res => res.data);
      }
    }
  })
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: () => ({
    addCustomers: {
      type: CustomerType,
      description: 'add new customer',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        return axios
          .post(`http://localhost:3000/customers`, {
            name: args.name,
            age: args.age,
            email: args.email
          })
          .then(res => res.data);
      }
    },
    deleteCustomers: {
      type: CustomerType,
      description: 'delete customer',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        return axios
          .delete(`http://localhost:3000/customers/${args.id}`)
          .then(res => res.data);
      }
    },
    editCustomers: {
      type: CustomerType,
      description: 'edit customer',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        return axios
          .patch(`http://localhost:3000/customers/${args.id}`, args)
          .then(res => res.data);
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
