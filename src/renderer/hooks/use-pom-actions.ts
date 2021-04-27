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

export const pauseAction: Func = (state) => {
  window.electron.sendProgress(-1);

  return { ...state, status: "paused" };
};

export const restAction: Func = (state, value) => {
  if (state.rest.remaining === 0) {
    window.electron.notify("Time to make the donuts!");

    return pauseAction(state, value);
  }

  const remaining = state.rest.remaining - 1;

  window.electron.sendProgress(remaining / state.rest.max);

  return {
    ...state,
    rest: { ...state.rest, remaining },
  };
};

export const workAction: Func = (state, value) => {
  if (state.work.remaining === 0) {
    window.electron.notify("Done working. Take a break!");

    return pauseAction(state, value);
  }

  const remaining = state.work.remaining - 1;

  window.electron.sendProgress(remaining / state.work.max);

  return {
    ...state,
    work: { ...state.work, remaining },
  };
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
