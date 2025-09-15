import { useOptimistic } from "react";
import AddMessage from "./components/AddMessage";
import ListMessages from "./components/ListMessages";

import { trpc } from "./trpc";
import type { OptimisticMessage } from "./utils/types";
type MessageInput = { message: string };

const App = () => {
  const { data, isLoading, error } = trpc.getMessages.useQuery();
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    OptimisticMessage[],
    MessageInput
  >(data?.messages || [], (state, action) => [
    ...state,
    { message: action.message, pending: true },
  ]);
  if (isLoading) {
    return <p>Please wait...</p>;
  } else if (error) {
    return <p className="text-red-400">Failed to fetch messages</p>;
  } else {
    return (
      <div>
        <ListMessages messages={optimisticMessages} />
        <AddMessage addOptimisticMessage={addOptimisticMessage} />
      </div>
    );
  }
};

export default App;
