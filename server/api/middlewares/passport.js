const passport = require("passport");
const fetch = require("node-fetch");
const { Strategy, ExtractJwt } = require("passport-jwt");
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

const jwtStrategy = new Strategy(options, async (payload, done) => {
  const { data, errors } = await execute();
  const user = await data.users.filter(
    (item) => item.username === payload.name
  );
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

passport.use("jwt-auth", jwtStrategy);
