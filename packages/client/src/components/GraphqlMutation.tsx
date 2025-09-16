import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useActionState } from "react";

type AddMessageInput = {
  text: string;
  author: string;
};

export const GraphqlMutation = () => {
  const ADD_MESSAGE = gql`
    mutation AddMessage($input: AddMessageInput!) {
      addMessage(input: $input) {
        text
        author
      }
    }
  `;

  const [addMessage] = useMutation(ADD_MESSAGE);
  const SubmitAction = async (
    _: { message: string; error: boolean },
    formData: FormData
  ) => {
    const text = formData.get("text") as string;
    const author = formData.get("author") as string;
    try {
      const data = await addMessage({ variables: { input: { text, author } } });
      console.log(data);
      return { error: false, message: "Data sent successfully" };
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
    <form className="flex flex-col gap-3" action={action}>
      <input
        placeholder="Author"
        name="author"
        className="px-8 py-4 bg-white text-black placeholder:black"
      ></input>
      <input
        placeholder="Text"
        className="px-8 py-4 bg-white text-black placeholder:black"
        name="text"
        type="textarea"
      ></input>
      <button
        disabled={pending}
        className="bg-white px-8 py-4 w-fit text-black rounded-md"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
      {state.error ? (
        <p className="text-red-400">{state.message}</p>
      ) : (
        <p className="text-green-400">{state.message}</p>
      )}
    </form>
  );
};
