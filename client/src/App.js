import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Store from './components/Store';
import Brewing from './components/Brewing';
import Shop from './components/Shop';
import Faq from './components/Faq';
import StoreProvider from './utils/StoreContext';
import './App.css';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
        <Route
            path="/"
            element={<Landing />}
          />
          <Route
            path="/login"
            element={<StoreProvider><Login /></StoreProvider>}
          />
          <Route
            path="/signup"
            element={<StoreProvider><Signup /></StoreProvider>}
          />
          <Route
            path="/main"
            element={<Main />}
          />
          <Route
            path="/store"
            element={<StoreProvider><Store /></StoreProvider>}
          />
          <Route
            path="/brewing"
            element={<StoreProvider><Brewing /></StoreProvider>}
          />
          <Route
            path="/shop"
            element={<StoreProvider><Shop /></StoreProvider>}
          />
          <Route
            path="/faq"
            element={<Faq />}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
