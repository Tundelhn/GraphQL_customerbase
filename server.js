const express = require('express');
const expressGraphql = require('express-graphql');
const schema = require('./schema');
const app = express();

app.use(
  '/graphql',
  expressGraphql({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
