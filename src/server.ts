
import express, { Application } from "express";
import { ApolloServer, ApolloError } from "apollo-server-express";
import * as dotenv from "dotenv";
import cors from 'cors';
import { typeDefs } from "./infrastructure/graphql/schema";
import { userResolvers } from "./infrastructure/graphql/resolvers/user.resolver";
import { packageResolvers } from "./infrastructure/graphql/resolvers/package.resolver";
import { connectDatabase } from "./infrastructure/database/mongodb";

dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
  const app: Application = express();

  // Enable CORS for all routes
  app.use(cors());
    
  // Parse JSON bodies
  app.use(express.json());
  // Combine userResolvers and packageResolvers
  const resolvers = {
    Query: {
      ...packageResolvers.Query, // Merge package query resolvers
    },
    Mutation: {
      ...userResolvers.Mutation, // Merge user mutation resolvers
      ...packageResolvers.Mutation, // Merge package mutation resolvers
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await connectDatabase();
  await server.start()
  
  server.applyMiddleware({ 
    app: app as any,
    path: '/graphql'
   });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
};

startServer().catch(error => {
  throw new ApolloError(
    'Failed to start server', 
    'SERVER_INITIALIZATION_ERROR',
    { originalError: error }
  );
});