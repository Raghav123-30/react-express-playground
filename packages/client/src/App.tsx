import { trpc } from "./trpc";

const App = () => {
  const { data, isLoading, error } = trpc.hello.useQuery({
    name: "Raghavendra",
  });
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{JSON.stringify(error)}</div>;
  } else {
    return <div>{JSON.stringify(data)}</div>;
  }
};

export default App;
