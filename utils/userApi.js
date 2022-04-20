import { getToken } from "./api";
import jwtDecode from "jwt-decode";

export const getUserData = async () => {
  const res = await getToken();
  const newRes = res.split(" ");
  const username = jwtDecode(newRes[1]).name;
  return username;
};
