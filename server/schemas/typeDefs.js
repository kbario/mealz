const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    recipes: [Recipe]
    cards: [Card]
    createdAt: String
    numberOfRecipes: Int
  }

  input Ingredients {
    name: String
    amount: Int
    unit: String
  }

  type Ingredient {
    _id: ID
    name: String
    amount: Int
    unit: String
  }

  type Recipe {
    _id: ID
    name: String
    description: String
    serves: String
    ingredients: [Ingredient]
    instructions: [String]
    from: String
    cookTime: Int
    cuisine: String
    numberOfIngredients: Int
  }

  type Card {
    _id: String
    name: String
    date: String
    serving: [Int]
    meals: [Recipe]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    # user(profile: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(
      name: String!
      description: String
      serves: Int!
      ingredients: [Ingredients]!
      instructions: [String]!
      from: String
      cuisine: String
      cookTime: Int
    ): User
    addCard(name: String!, date: String!, serving: [Int]!, meals: [ID]!): User
    removeRecipe(recipeId: String!): User
    removeUser: User

    #   addSkill(profileId: ID!, skill: String!): Profile
  }
`;

module.exports = typeDefs;
