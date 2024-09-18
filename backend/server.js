require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const routes = require('./routes');
const logger = require('./utils/logger');
const db = require('./Models');
const schema = require('./Graphql/schema');
const resolvers = require('./Graphql/resolvers');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Test database connection
db.sequelize.authenticate()
  .then(() => logger.info('MySQL connected'))
  .catch(err => logger.error('MySQL connection error:', err));


// GraphQL middleware
app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true,
}));

// Routes
app.use('/api', routes);

// Socket.IO setup
io.on('connection', (socket) => {
  logger.info('A user connected');
  
  socket.on('message', (data) => {
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    logger.info('A user disconnected');
  });
});

// Sync Sequelize models and start server
const PORT = process.env.PORT || 4000;
db.sequelize.sync()
  .then(() => {
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  });
