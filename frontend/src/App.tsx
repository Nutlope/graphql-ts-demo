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

interface UserInterface {
  __typename: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  ipAddress: string;
}

function App() {
  const { data, loading, error } = useQuery(QueryAllUsers);

  return (
    <div className="App">
      <h1>List of Users</h1>
      {loading && "It's loading"}
      {error && error.message}
      {data &&
        data["getAllUsers"].map((user: UserInterface) => (
          <div className="listItem">
            <h3>{user["firstName"]}</h3>
            <p>{user["email"]}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
