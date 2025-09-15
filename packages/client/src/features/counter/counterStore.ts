import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

type CounterState = {
  value: number;
  step: number;
  status: "idle" | "loading" | "success" | "failed";
};

const initialState: CounterState = {
  value: 0,
  step: 1,
  status: "idle",
};

const counterSlice = createSlice({
  name: "counter",
  reducers: {
    increment: (state) => {
      state.value += state.step;
    },
    decrement: (state) => {
      state.value -= state.step;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    reset: () => {
      return initialState;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        incrementAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "success";
          state.value += action.payload;
        }
      )
      .addCase(incrementAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
  initialState,
});

export const incrementAsync = createAsyncThunk(
  "async/increment",
  async (amount: number) => {
    await new Promise((r) => setTimeout(r, 3000));
    return amount;
  }
);

export const { increment, decrement, setStep, reset, setCount } =
  counterSlice.actions;
export default counterSlice.reducer;
