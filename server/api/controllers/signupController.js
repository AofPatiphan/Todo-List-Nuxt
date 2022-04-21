const fetch = require("node-fetch");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const execute = async (variables) => {
  const fetchResponse = await fetch("https://todosnuxt.hasura.app/v1/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: HASURA_OPERATION,
      variables,
    }),
  });
  const data = await fetchResponse.json();
  console.log("DEBUG: ", data);
  return data;
};

exports.signup = async (req, res) => {
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
