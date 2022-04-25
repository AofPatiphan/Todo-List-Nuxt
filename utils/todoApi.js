import gql from "graphql-tag";
// import axios from "../config/axios";
import { getUserId } from "./userApi";

export const GET_TODO = async () => {
  let userId = await getUserId();
  return gql`
    subscription MySubscription{
      todos(
        where: { todos_users: { _eq: ${userId} } }
        order_by: { updated_at: desc }
      ) {
        id
        todos_list
        todos_active
        created_at
        updated_at
        todos_users
      }
    }
  `;
};

export const ADD_TODO = async () => {
  let userId = await getUserId();
  return gql`
    mutation MyMutation($todo: String) {
      insert_todos_one(object: { todos_list: $todo, todos_users: ${userId} }) {
        id
        todos_list
        todos_active
        created_at
        updated_at
      }
    }
  `;
};

export const DELETE_TODO = () => {
  return gql`
    mutation MyMutation($id: Int) {
      delete_todos(where: { id: { _eq: $id } }) {
        affected_rows
      }
    }
  `;
};

export const UPDATE_TODO = () => {
  return gql`
    mutation MyMutation($id: Int, $input: String, $status: Boolean) {
      update_todos(
        where: { id: { _eq: $id } }
        _set: { todos_list: $input, todos_active: $status }
      ) {
        returning {
          id
          todos_list
          todos_active
          todos_users
          created_at
          updated_at
        }
      }
    }
  `;
};

// export const addTodo = async (input) => {
//   try {
//     if (input) {
//       const user = await getUserData();
//       const res = await axios.post("/create-todo", {
//         todo: input,
//         userId: user.sub,
//       });
//       return res;
//     }
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getTodo = async () => {
//   try {
//     const user = await getUserData();
//     const res = await axios.get(`/get-todos/${user.sub}`);
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const deleteTodo = async (id) => {
//   try {
//     const res = await axios.delete(`/delete-todo/${id}`);
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const updateTodo = async (id, input, status) => {
//   try {
//     const res = await axios.put(`/update-todo/${id}`, {
//       input,
//       status,
//     });
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };
