import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import "./index.css";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
])

// Initialize Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3001/graphql", // Replace with your GraphQL endpoint
  }),
  cache: new InMemoryCache(), // Recommended for caching GraphQL queries
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
