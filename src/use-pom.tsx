import React, {
  createContext,
  FC,
  Reducer,
  useEffect,
  useReducer,
} from "react";

type Status = "paused" | "resting" | "working";

const initialState = {
  remaining: { rest: 1, work: 3 },
  status: "paused" as Status,
  pause: () => {
    /* */
  },
  startRest: () => {
    /* */
  },
  startWork: () => {
    /* */
  },
  reset: () => {
    /* */
  },
};

type State = typeof initialState;

type Action =
  | "pause"
  | "rest"
  | "work"
  | "start-resting"
  | "start-working"
  | "reset-state";

const Context = createContext(initialState);
Context.displayName = "PomContext";

export const Provider: FC = (props) => (
  <Context.Provider {...props} value={initialState} />
);

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action) {
    case "pause":
      return { ...state, status: "paused" };
    case "rest":
      if (state.remaining.rest === 0) {
        return { ...state, status: "paused" };
      }
      return {
        ...state,
        remaining: { ...state.remaining, rest: state.remaining.rest - 1 },
      };
    case "work":
      if (state.remaining.work === 0) {
        return { ...state, status: "paused" };
      }
      return {
        ...state,
        remaining: { ...state.remaining, work: state.remaining.work - 1 },
      };
    case "start-resting":
      return { ...state, status: "resting" };
    case "start-working":
      return { ...state, status: "working" };
    case "reset-state":
      return initialState;
    default:
      throw new Error(`No handler for action: ${action}`);
  }
};

export const usePom = (): State => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const interval = setInterval((): void => {
      switch (state.status) {
        case "paused":
          clearInterval(interval);
          return;
        case "resting":
          dispatch("rest");
          return;
        case "working":
          dispatch("work");
          return;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [state.status]);

  return {
    ...state,
    pause: () => dispatch("pause"),
    startRest: () => dispatch("start-resting"),
    startWork: () => dispatch("start-working"),
    reset: () => dispatch("reset-state"),
  };
};
