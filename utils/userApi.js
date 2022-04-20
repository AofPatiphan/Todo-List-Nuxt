import { getToken } from "./api";
import jwtDecode from "jwt-decode";

export const getUserData = async () => {
  const res = await getToken();
  const newRes = res.split(" ");
  const user = jwtDecode(newRes[1]);
  return user;
};
