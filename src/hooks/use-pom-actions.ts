import { initialPomState, UsePomState } from "./use-pom-reducer";

export type UsePomAction =
  | ["pause"]
  | ["rest"]
  | ["work"]
  | ["set-rest", number]
  | ["set-work", number]
  | ["start-resting"]
  | ["start-working"]
  | ["reset"];

type Func = (state: UsePomState, value: UsePomAction[1]) => UsePomState;

export const pauseAction: Func = (state) => ({ ...state, status: "paused" });

export const restAction: Func = (state) =>
  state.rest.remaining === 0
    ? { ...state, status: "paused" }
    : {
        ...state,
        rest: { ...state.rest, remaining: state.rest.remaining - 1 },
      };

export const workAction: Func = (state) =>
  state.work.remaining === 0
    ? { ...state, status: "paused" }
    : {
        ...state,
        work: { ...state.work, remaining: state.work.remaining - 1 },
      };

export const setRestAction: Func = (state, value) => {
  let remaining = state.rest.remaining;
  const max =
    typeof value === "number" ? value : initialPomState.rest.remaining;

  if (remaining >= max) remaining = max;

  return { ...state, status: "paused", rest: { remaining, max } };
};

export const setWorkAction: Func = (state, value) => {
  let remaining = state.work.remaining;
  const max =
    typeof value === "number" ? value : initialPomState.work.remaining;

  if (remaining >= max) remaining = max;

  return { ...state, status: "paused", work: { remaining, max } };
};

export const startRestingAction: Func = (state) => ({
  ...state,
  status: "resting",
});

export const startWorkingAction: Func = (state) => ({
  ...state,
  status: "working",
});

export const resetAction: Func = (state) => {
  const { rest, work } = state;

  return {
    ...initialPomState,
    rest: { ...rest, remaining: rest.max },
    work: { ...work, remaining: work.max },
  };
};
