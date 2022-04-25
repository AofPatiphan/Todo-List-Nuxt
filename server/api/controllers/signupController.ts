// const fetch = require("node-fetch");
import fetch from "node-fetch";
const bcrypt = require("bcryptjs");
import { Request, Response } from "express";

const HASURA_OPERATION = `
mutation MyMutation($username:String!,$password:String!,$profileUrl:String!) {
  insert_users_one(object: {
    username: $username,
    password: $password,
    profileUrl: $profileUrl
  }) {
    id
  }
}
`;

const execute = async (variables: any) => {
  const fetchResponse = await fetch("https://todosnuxt.hasura.app/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: HASURA_OPERATION,
      variables,
    }),
  });
  const data = await fetchResponse.json();
  return data;
};

exports.signup = async (req: Request, res: Response) => {
  const { username, password, confirmPassword, profileUrl } = req.body.input;

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Password is not match" });

  let hashedPassword = await bcrypt.hash(password, 10);

  const { data, errors } = await execute({
    username,
    password: hashedPassword,
    profileUrl: profileUrl,
  });

  if (errors) {
    return res.status(400).json(errors[0]);
  }

  return res.json({
    ...data.insert_users_one,
  });
};
