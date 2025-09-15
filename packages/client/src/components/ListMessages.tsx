import { trpc } from "../trpc";

const ListMessages = () => {
  const { data, isLoading, error } = trpc.getMessages.useQuery();
  if (isLoading) {
    return <p>Please wait...</p>;
  } else if (error) {
    return <p className="text-red-400">Failed to fetch messages</p>;
  } else {
    return (
      <div className="bg-white rounded-md shadow-md px-8 py-12 [&>p]:text-black space-y-2">
        {!data?.messages.length ? (
          <p className="t">No messages to show. Add new messages</p>
        ) : (
          data?.messages.map((item) => <p key={item.message}>{item.message}</p>)
        )}
      </div>
    );
  }
};

export default ListMessages;
