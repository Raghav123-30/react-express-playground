import type { OptimisticMessage } from "../utils/types";

type ListMessagesProps = {
  messages: OptimisticMessage[];
};

const ListMessages = ({ messages }: ListMessagesProps) => {
  return (
    <div className="bg-white rounded-md shadow-md px-8 py-12 space-y-2">
      {!messages.length ? (
        <p className="t">No messages to show. Add new messages</p>
      ) : (
        messages.map((item) => (
          <p
            key={item.message}
            className={`${item.pending ? "text-neutral-400" : "text-black"}`}
          >
            {item.message}
          </p>
        ))
      )}
    </div>
  );
};

export default ListMessages;
