import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import Calendar from "./pages/Calendar.jsx";
import "./styles/index.css";
import Homepage from "./pages/Homepage.jsx";

// Initialize Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3001/graphql", // Your GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/calendar",
    element: <Calendar />
  },
  {
    path: "/homepage",
    element: <Homepage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
