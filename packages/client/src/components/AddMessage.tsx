import { useActionState } from "react";
import { trpc } from "../trpc";

type FormState = { message: string; error: boolean };
type AddMessageProps = {
  addOptimisticMessage: (action: { message: string }) => void;
};

const AddMessage = ({ addOptimisticMessage }: AddMessageProps) => {
  const mutation = trpc.storeMessage.useMutation();
  const utils = trpc.useUtils();

  const SubmitAction = async (
    _: FormState,
    formData: FormData
  ): Promise<FormState> => {
    try {
      const message = formData.get("message") as string;
      addOptimisticMessage({ message });
      const data = await mutation.mutateAsync({
        message,
      });
      utils.getMessages.invalidate();
      return { error: false, message: data.message };
    } catch (error) {
      console.log(error);
      return { error: true, message: "Something went wrong" };
    }
  };

  const [state, action, pending] = useActionState(SubmitAction, {
    error: false,
    message: "",
  });
  return (
    <form className="space-x-3 space-y-3 mt-8" action={action}>
      <input
        className="px-8 py-4 text-neutral-400 bg-white placeholder:text-gray-800"
        name="message"
        placeholder="Message"
      ></input>
      <button
        type="submit"
        disabled={pending}
        className="bg-white px-8 py-4 rounded-md text-gray-800 font-bold"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
      {state.error ? (
        <p className="text-red-400">{state.message}</p>
      ) : (
        <p className="text-green-500">{state.message}</p>
      )}
    </form>
  );
};

export default AddMessage;
