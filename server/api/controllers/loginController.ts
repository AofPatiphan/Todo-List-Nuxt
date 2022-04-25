const jwt = require("jsonwebtoken");
// const fetch = require("node-fetch");
import fetch from "node-fetch";
const bcrypt = require("bcryptjs");
import { Request, Response } from "express";
const HASURA_OPERATION = `
query MyQuery {
    users {
      id
      username
      password
      created_at
      updated_at
    }
  }
`;

const execute = async () => {
  const fetchResponse = await fetch("https://todosnuxt.hasura.app/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: HASURA_OPERATION,
    }),
  });
  const data = await fetchResponse.json();
  return data;
};

exports.login = async (req: Request, res: Response) => {
  const { username, password } = req.body.input;
  const { data, errors } = await execute();

  const user = await data.users.filter((item: any) => item.username === username);
  if (!user[0]) {
    return res.status(400).json({ message: "username is incorrect" });
  }

  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) {
    return res.status(400).json({ message: "password is incorrect" });
  }

  const payload = {
    id: user[0].id.toString(),
    name: username,
    iat: Date.now() / 1000,
    iss: "https://myapp.com",
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": user[0].id.toString(),
      "x-hasura-default-role": "user",
      "x-hasura-role": "user",
    },
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  // success
  return res.json({
    token: token,
  });
};
