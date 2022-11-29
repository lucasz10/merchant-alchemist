import { gql } from '@apollo/client';

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
      _id
    }
  }
`;