import React, {
  createContext,
  FC,
  Reducer,
  useEffect,
  useReducer,
} from "react";

type Status = "paused" | "resting" | "working";

const initialState = {
  remaining: { rest: 0, work: 0 },
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
};

type State = typeof initialState;

type Action = "rest" | "work" | "pause" | "start-resting" | "start-working";

const Context = createContext(initialState);
Context.displayName = "PomContext";

export const Provider: FC = (props) => (
  <Context.Provider {...props} value={initialState} />
);

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action) {
    case "pause":
      return { ...state, status: "paused" };
    case "start-resting":
      return { ...state, status: "resting" };
    case "start-working":
      return { ...state, status: "working" };
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
    default:
      throw new Error(`No handler for action: ${action}`);
  }
};

export const usePom = ({
  defaultRest = 1,
  defaultWork = 3,
}: undefined | { defaultRest?: number; defaultWork?: number }): State => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    remaining: {
      ...initialState.remaining,
      rest: defaultRest,
      work: defaultWork,
    },
  });

  useEffect(() => {
    const interval = setInterval((): void => {
      console.log({ status: state.status });
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
  };
};
