/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DishFragment
// ====================================================

export interface DishFragment_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface DishFragment_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: DishFragment_options_choices[] | null;
}

export interface DishFragment {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
  description: string;
  options: DishFragment_options[] | null;
}
