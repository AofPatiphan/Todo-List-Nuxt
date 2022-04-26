const passport = require("passport");
// const fetch = require("node-fetch");
import fetch from "node-fetch";
const { Strategy, ExtractJwt } = require("passport-jwt");
const options: {} = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const HASURA_OPERATION: string = `
query MyQuery {
    users {
      id
      username
    }
  }
`;
const execute = async () => {
  const fetchResponse = await fetch(process.env.HASURA_URI as any, {
    method: "POST",
    body: JSON.stringify({
      query: HASURA_OPERATION,
    }),
  });
  const data = await fetchResponse.json();
  return data;
};

const jwtStrategy = new Strategy(options, async (payload: any, done: any) => {
  const { data, errors } = await execute();
  const user = await data.users.filter(
    (item: any) => item.username === payload.name
  );
  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
});

passport.use("jwt-auth", jwtStrategy);
