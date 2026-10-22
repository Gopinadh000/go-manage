
export const CREATE_PROJECT_MUTATION = `
    mutation CreateProject(
        $input: CreateProjectInput!
    ) {
        createProject(input: $input) {
          status
        statusMessage
        data {
            id
            name
            key
            description
            status
            createdAt
            updatedAt
        }
        }

    }
`;



export const UPDATE_PROJECT_MUTATION = `
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
      description
      status
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;

export const DELETE_PROJECT_MUTATION = `
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id){
     status
     statusMessage
    }
  }
`;