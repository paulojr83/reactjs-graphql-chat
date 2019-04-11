import { split } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql',
});


const wsLink = new WebSocketLink({
    uri: 'ws://localhost:8000/subscriptions',
    options: { reconnect:true },
});

const link = split(
    ({ query }) =>{
        const { kind, operation } = getMainDefinition( query );
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link,
    cache:new InMemoryCache(),
});

export default client;