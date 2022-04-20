import axios from "../config/axios";
import { getUserData } from "./userApi";

export const addTodo = async (input) => {
  try {
    if (input) {
      const user = await getUserData();
      const res = await axios.post("/create-todo", {
        todo: input,
        userId: user.sub,
      });
      return res;
    }
    return;
  } catch (err) {
    console.log(err);
  }
};

export const getTodo = async () => {
  try {
    const user = await getUserData();
    const res = await axios.get(`/get-todos/${user.sub}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`/delete-todo/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (id, input, status) => {
  try {
    const res = await axios.put(`/update-todo/${id}`, {
      input,
      status,
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};
