import { ApolloLink, concat, split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import "subscriptions-transport-ws";

export default (ctx: any) => {
  const httpLink = new HttpLink({
    uri: "https://todosnuxt.hasura.app/v1/graphql",
  });

  // middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    const getToken = () => localStorage.getItem("token");
    const token = getToken();
    operation.setContext({
      headers: { authorization: `Bearer ${token}` },
    });
    return forward(operation);
  });

  const wsLink = process.client as any
    ? new WebSocketLink({
      uri: `wss://todosnuxt.hasura.app/v1/graphql`,
      options: {
        reconnect: true,
        connectionParams: () => {
          const getToken = () => localStorage.getItem("token");
          const token = getToken();
          return {
            Authorization: token ? `Bearer ${token}` : null,
          };
        },
      },
    })
    : "";

  interface Definintion {
    kind: string;
    operation?: string;
  };

  const link = process.server
    ? httpLink
    : split(
      ({ query }) => {

        const { kind, operation }: Definintion = getMainDefinition(query);

        return kind === "OperationDefinition" && operation === "subscription";
      },
      wsLink as any,
      httpLink
    );

  return {
    link: concat(middlewareLink, link),
    cache: new InMemoryCache(),
  };
};
