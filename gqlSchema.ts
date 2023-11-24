//Pongo los tipos con los que voy a trabajar
//Obligatorio con ! y optativo no se pone nada
//El schema solo hace referencia a lo que esta dentro del schema
//Query pide datos y mutation modifica datos
export const schema = `#graphql 
  type Pet {
    id: ID! 
    name: String!
    breed: String!
  }
  type Query {
    pets(breed: String): [Pet!]! 
    pet(id: ID!): Pet!
  }
  type Mutation {
    getAllPets(): [Pet!]!
    getPetByBreed(breed: String!): [Pet!]!
    addPet(id: ID!, name: String!, breed: String!): Pet!
    deletePet(id: ID!): Pet!
    updatePet(id: ID!, name: String!, breed: String!): Pet!
  }
`;