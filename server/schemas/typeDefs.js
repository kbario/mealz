const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    recipes: [Recipe]
    days: [Day]
    createdAt: String
    numberOfRecipes: Int
  }

  input Ingredients {
    _id: ID
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
    from: String
    cookTime: Int
    cuisine: String
    numberOfIngredients: Int
  }

  input Cards {
    name: String
    meals: [ID]
  }

  type Card {
    _id: String
    name: String
    meals: [Recipe]
  }

  type Day {
    _id: String
    date: String
    cards: [Card]
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
      description: String!
      serves: Int!
      ingredients: [Ingredients]!
      from: String!
      cuisine: String!
      cookTime: Int!
    ): User
    addDay(date: String!, cards: [Cards]!): User
    removeRecipe(recipeId: String!): User
    removeUser: User

    #   addSkill(profileId: ID!, skill: String!): Profile
  }
`;

module.exports = typeDefs;
