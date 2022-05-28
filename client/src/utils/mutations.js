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
  mutation AddRecipe(
    $name: String!
    $description: String
    $serves: Int!
    $ingredients: [Ingredients]!
    $from: String
    $cuisine: String
    $cookTime: Int
  ) {
    addRecipe(
      name: $name
      description: $description
      serves: $serves
      ingredients: $ingredients
      from: $from
      cuisine: $cuisine
      cookTime: $cookTime
    ) {
      name
      recipes {
        name
        description
        serves
        ingredients
        from
        cuisine
        cookTime
      }
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
