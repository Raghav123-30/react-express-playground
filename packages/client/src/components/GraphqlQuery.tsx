import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GraphqlQuery = () => {
  const GREET_QUERY = gql`
    query getGreeting {
      greet {
        message
      }
    }
  `;
  const { data, loading, error } = useQuery(GREET_QUERY);
  if (loading) {
    return <div>loading...</div>;
  } else if (error) {
    return <div>{JSON.stringify(error)}</div>;
  } else {
    return <div>{JSON.stringify(data)}</div>;
  }
};

export default GraphqlQuery;
