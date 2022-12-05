import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const BUY_INGREDIENT = gql`
  mutation Mutation($ingredientName: String!, $storeId: ID!) {
    buyIngredient(ingredientName: $ingredientName, storeId: $storeId) {
      goldCount
    }
  }
`;

export const BREW_POTION = gql`
  mutation Mutation($potionName: String!, $storeId: ID!) {
    brewPotion(potionName: $potionName, storeId: $storeId) {
      potions {
        _id
        desc
        owned
        potionName
      }
      ingredients {
        _id
        desc
        ingredientName
        owned
      }
    }
  }
`;

export const SELL_POTION = gql`
  mutation SellPotion($potionName: String!, $storeId: ID!) {
    sellPotion(potionName: $potionName, storeId: $storeId) {
      potions {
        _id
        desc
        owned
        potionName
      }
      ingredients {
        _id
        desc
        ingredientName
        owned
      }
    }
  }
`;