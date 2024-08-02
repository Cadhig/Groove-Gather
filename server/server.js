const express = require('express');
const { ApolloServer } = require('@apollo/server');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
require('dotenv').config();

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen({ port: 5000 }, () =>
    console.log(`Server running at http://localhost:5000${server.graphqlPath}`)
  );
}).catch(err => console.error(err));
