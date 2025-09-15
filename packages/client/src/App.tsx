import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppStore } from "./store";
import {
  decrement,
  increment,
  incrementAsync,
  reset,
  setCount,
  setStep,
} from "./features/counter/counterStore";

const App = () => {
  const state = useSelector((store: AppStore) => store.counter);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex flex-col gap-3 [&>]:w-fit ">
      <h1 className="text-xl font-bold text-white">
        The count is {state.value}
      </h1>
      <p className="text-sm text-neutral-300">The step is {state.step}</p>
      <input
        type="range"
        min={1}
        max={10}
        value={state.step}
        className="accent-white"
        onChange={(e) => dispatch(setStep(Number(e.target.value)))}
      ></input>
      <button
        onClick={() => dispatch(increment())}
        className="bg-white hover:bg-neutral-300 font-bold text-black p-4 rounded-md"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch(decrement())}
        className="bg-white hover:bg-neutral-300 font-bold text-black p-4 rounded-md"
      >
        Decrement
      </button>
      <button
        onClick={() => dispatch(reset())}
        className="bg-white hover:bg-neutral-300 font-bold text-black p-4 rounded-md"
      >
        Reset
      </button>
      <input
        type="number"
        className="px-8 py-3 bg-white text-neutral-800"
        value={state.value}
        onChange={(e) => dispatch(setCount(Number(e.target.value)))}
      ></input>
      <button
        className="bg-white hover:bg-neutral-300 font-bold text-black p-4 rounded-md"
        onClick={() => dispatch(incrementAsync(20))}
      >
        Increment Async
      </button>
      {state.status === "loading" && (
        <p className="text-sm">Please wait ....</p>
      )}
      {state.status === "success" && (
        <p className="text-sm text-green-400">Async action succeeded</p>
      )}
      {state.status === "failed" && (
        <p className="text-sm text-red-400">Something went wrong</p>
      )}
    </div>
  );
};

export default App;
