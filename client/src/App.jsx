import { gql, useQuery } from "@apollo/client";

export const GET_ITEMS = gql`
  query Teachers {
    teachers {
      _id
      name
    }
  }
`;
export default function App() {
  const client = useQuery(GET_ITEMS);

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
