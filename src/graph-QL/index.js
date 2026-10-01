import { ApolloServer } from "@apollo/server";
import projectSchema from "./schemas/project.schema.js";
import projectResolver from "./resolvers/project.resolver.js";
import userSchema from "./schemas/user.schema.js";
import userResolver from "./resolvers/user.resolver.js";


const typeDefs =  [
    projectSchema,
    userSchema
]

const resolvers = {
    Query : {
        ...projectResolver.Query,
        ...userResolver.Query,
    },
    Mutation: {
        ...projectResolver.Mutation,
    },
}

const grapghQLServer =  new ApolloServer({
    typeDefs,
    resolvers
})

export default grapghQLServer;