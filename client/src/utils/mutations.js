import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation addRecipe(
    $name: String!
    $description: String
    $serves: Int!
    $ingredients: [Ingredients]!
    $instructions: [String]!
    $from: String
    $cuisine: String
    $cookTime: Int
  ) {
    addRecipe(
      name: $name
      description: $description
      serves: $serves
      ingredients: $ingredients
      instructions: $instructions
      from: $from
      cuisine: $cuisine
      cookTime: $cookTime
    ) {
      name
      recipes {
        name
        description
        serves
        ingredients {
          name
        }
        instructions
        from
        cuisine
        cookTime
        numberOfIngredients
      }
    }
  }
`;

export const ADD_CARD = gql`
  mutation addCard(
    $name: String!
    $date: String!
    $serving: [Int]!
    $meals: [ID]!
  ) {
    addCard(name: $name, date: $date, serving: $serving, meals: $meals) {
      name
    }
  }
`;

export const REMOVE_SKILL = gql`
  mutation removeSkill($skill: String!) {
    removeSkill(skill: $skill) {
      _id
      name
      skills
    }
  }
`;
