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
