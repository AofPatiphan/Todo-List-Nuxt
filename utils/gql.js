import { gql } from "graphql-tag";

export const SUB_TODO = gql`
subscription MySubscription {
  todo(order_by: {updated_at: desc}, where: {todos_users: {_eq: ${48}}}) {
    id
    todos_list
    todos_active
    todos_users
    created_at
    updated_at
  }
}
`;
