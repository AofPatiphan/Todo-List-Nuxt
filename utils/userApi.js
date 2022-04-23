import { getToken } from "./api";
import jwtDecode from "jwt-decode";
import axios1 from "../config/axios";
import axios from "axios";

export const getUserData = async () => {
  const res = await getToken();
  const newRes = res.split(" ");
  const user = jwtDecode(newRes[1]);
  return user;
};

export const getUserId = async () => {
  try {
    const user = await getUserData();
    return user.sub;
  } catch (err) {
    console.log(err);
  }
};

export const getMe = async () => {
  try {
    const response = await getToken();
    const newRes = response.split(" ");
    const user = jwtDecode(newRes[1]);
    const res = await axios1.get(`/get-me/${+user.sub}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const uploadImg = async (base64EncodedImage) => {
  try {
    const res = await axios.post("http://localhost:3000/api/upload", {
      data: base64EncodedImage,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
