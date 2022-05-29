import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      name
      recipes {
        _id
        name
        serves
        from
        cookTime
        cuisine
        numberOfIngredients
      }
      cards {
        _id
        name
        date
        meals {
          name
          ingredients {
            name
            amount
            unit
          }
          serves
        }
        serving
        date
      }
    }
  }
`;
