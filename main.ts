import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Mutation } from "./resolvers/mutation.ts";
import { Query } from "./resolvers/query.ts";
import { schema } from "./gqlSchema.ts";
import mongoose from "mongoose";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
    throw new Error("No mongo URL found");
  }
  
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    throw new Error("Error connecting to MongoDB Atlas:", error);
  }

const resolvers = {
  Query,
  Mutation
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const {url} = await startStandaloneServer(server, {listen: {port: 3000}}); //Por defecto es el puerto 4000
console.log(`🚀 Server ready at ${url}`);