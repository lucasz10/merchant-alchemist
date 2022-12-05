import { gql } from '@apollo/client';

export const QUERY_USER_STORES = gql`
  query Query($username: String!) {
    user(username: $username) {
      stores {
        _id
      }
    }
  }
`;

export const QUERY_INGREDIENTS = gql`
  query ingredients {
    ingredients {
      _id
      ingredientName
      desc
      buyPrice
    }
  }
`;

export const QUERY_GOLDCOUNT = gql`
  query store($storeId: ID!) {
    store(storeId: $storeId) {
      goldCount
    }
  }
`;

export const QUERY_INVENTORY = gql`
  query store($storeId: ID!) {
    store(storeId: $storeId) {
      potions
      ingredients
    }
  }
`;