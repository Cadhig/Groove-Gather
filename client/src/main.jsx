import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./Routes/App.jsx";
import Login from "./Routes/Login.jsx";
import Signup from "./Routes/Signup.jsx";
import Profile from "./Routes/Profile.jsx";
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
    element: <Login />
  },
  {
    path: "/App",
    element: <App />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/profile",
    element: <Profile />
  }
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
