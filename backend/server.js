const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const { graphqlHTTP } = require("express-graphql");
const logger = require("./utils/logger");
const db = require("./Models");
const schema = require("./Graphql/schema");
const resolvers = require("./Graphql/resolvers");

// Initialize Express app
const app = express();
app.use(cors({ origin: "*" }));
const server = http.createServer(app);
const io = new Server(server);

// Database connection
db.sequelize
  .authenticate()
  .then(() => logger.info("MySQL connected"))
  .catch((err) => logger.error("MySQL connection error:", err));

// GraphQL middleware
app.use(
  "/graphql",
  graphqlHTTP((req) => {
    console.log("Received request headers:", req.headers);
    return {
      schema,
      rootValue: resolvers,
      context: ({ req }) => {
        return { req };
      },
      graphiql: true,
    };
  })
);

// Socket.IO setup
io.on("connection", (socket) => {
  logger.info("A user connected");

  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    logger.info("A user disconnected");
  });
});

// Sync Sequelize models and start server
const PORT = process.env.PORT || 4000;
db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});
