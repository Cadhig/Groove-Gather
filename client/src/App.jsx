import { useApolloClient } from "@apollo/client";
export default function App() {
  const client = useApolloClient({});
  console.log(client);
  return (
    <div>
      <h1>Hello App</h1>
      <button
        onClick={() => {
          // call api
          fetch("/api", {
            method: "POST",
          })
            .then((res) => res.json())
            .then((json) => {
              console.log(json);
            });
        }}
      ></button>
    </div>
  );
}
