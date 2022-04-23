const fetch = require("node-fetch");
const { Strategy, ExtractJwt } = require("passport-jwt");
require("dotenv").config();
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const HASURA_OPERATION = `
query MyQuery {
    users {
      id
      username
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

exports.getme = async (req, res) => {
  const user = req.user;
  return res.status(200).json({ user });
};
