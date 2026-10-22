export const PROJECT_OPTIONS_QUERY = `





`

export const PROJECT_CARDS_QUERY = `






`

export const PROJECT_BY_ID_QUERY = `
  query ProjectById($id: ID!) {
    projectById(id: $id) {
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
`