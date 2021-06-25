import { useQuery, gql } from "@apollo/client";

const QueryAllUsers = gql`
  query {
    getAllUsers {
      firstName
      email
      lastName
      ipAddress
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(QueryAllUsers);

  return (
    <div className="App">
      <h1>List of Users</h1>
      {loading && "It's loading"}
      {error && error.message}
      {data &&
        data["getAllUsers"].map((user: any) => (
          <div className="listItem">
            <h3>{user["firstName"]}</h3>
            <p>{user["email"]}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
