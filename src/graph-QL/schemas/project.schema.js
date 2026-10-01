

const projectSchema = `#graphql


   type ProjectOwner {
     id : ID!
     firstName : String!
     lastName : String!
     profilePic : String
     role : String
   }

   type ProjectOption {
       id: ID!
       label : String!
       value : String!
   }


   type ProjectCard {
       id : ID!
       name : String!
       key : String!
       description :String
       status :  String
       owner : ProjectOwner
       createdAt  :String
       updatedAt :String
   }

   input CreateProjectInput {
       name :  String!
       description : String
       key : String!
       ownerId : ID!
   }

   input UpdateProjectInput {
      name: String
      description: String
      startDate: String
      endDate: String
      ownerId: ID
      isPrivate: Boolean
      status: String
   }

   type CreateProjectResponse {
    status: Boolean!
    statusMessage: String!
    data: ProjectCard

   }

   type Query {
      projectOptions: [ProjectOption!]!
      projectCards: [ProjectCard!]!
   }


   type DeleteProjectResponse {
     status : Boolean!,
     statusMessage : String!
    }


   type Mutation {
      createProject(input: CreateProjectInput!) :  CreateProjectResponse!
      updateProject(id: ID!, input: UpdateProjectInput!): ProjectCard!
      deleteProject(id: ID!): DeleteProjectResponse!
   }

`;

export default projectSchema;