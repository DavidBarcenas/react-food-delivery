import {gql} from '@apollo/client';

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantFragment on Restaurant {
    id
    name
    coverImage
    category {
      name
    }
    address
    isPromoted
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    name
    coverImage
    slug
    restaurantCount
  }
`;

export const DISH_FRAGMENT = gql`
  fragment DishFragment on Dish {
    id
    name
    price
    photo
    description
    options {
      name
      extra
      choices {
        name
        extra
      }
    }
  }
`;

export const ORDERS_FRAGMENT = gql`
  fragment OrderFragment on Order {
    id
    createdAt
    total
  }
`;
