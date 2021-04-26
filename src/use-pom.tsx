import React, {
  createContext,
  FC,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from "react";

type Status = "paused" | "resting" | "working";

const initialState = {
  rest: { max: 1, remaining: 1 },
  work: { max: 3, remaining: 3 },
  status: "paused" as Status,
  pause() {
    //
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setRest(rest: number) {
    //
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setWork(work: number) {
    //
  },
  startRest() {
    //
  },
  startWork() {
    //
  },
  reset() {
    //
  },
};

type State = typeof initialState;

type Action =
  | ["pause"]
  | ["rest"]
  | ["work"]
  | ["set-rest", number]
  | ["set-work", number]
  | ["start-resting"]
  | ["start-working"]
  | ["reset"];

const Context = createContext(initialState);

Context.displayName = "PomContext";

export const usePom = (): State => useContext(Context);

const reducer: Reducer<State, Action> = (state, [type, value]) => {
  switch (type) {
    case "pause":
      return { ...state, status: "paused" };
    case "rest":
      if (state.rest.remaining === 0) {
        return { ...state, status: "paused" };
      }
      return {
        ...state,
        rest: { ...state.rest, remaining: state.rest.remaining - 1 },
      };
    case "work":
      if (state.work.remaining === 0) {
        return { ...state, status: "paused" };
      }
      return {
        ...state,
        work: { ...state.work, remaining: state.work.remaining - 1 },
      };
    case "set-rest": {
      let remaining = state.rest.remaining;
      const max = value;

      if (remaining >= max) remaining = max;

      return { ...state, status: "paused", rest: { remaining, max } };
    }
    case "set-work": {
      let remaining = state.work.remaining;
      const max = value;

      if (remaining >= max) remaining = max;

      return { ...state, status: "paused", work: { remaining, max } };
    }
    case "start-resting":
      return { ...state, status: "resting" };
    case "start-working":
      return { ...state, status: "working" };
    case "reset": {
      const { rest, work } = state;

      return {
        ...initialState,
        rest: { ...rest, remaining: rest.max },
        work: { ...work, remaining: work.max },
      };
    }
    default:
      throw new Error(`No handler for action type: ${type}`);
  }
};

export const Provider: FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const interval = setInterval((): void => {
      switch (state.status) {
        case "paused":
          clearInterval(interval);
          return;
        case "resting":
          dispatch(["rest"]);
          return;
        case "working":
          dispatch(["work"]);
          return;
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [state.status]);

  return (
    <Context.Provider
      {...props}
      value={{
        ...state,
        pause: () => dispatch(["pause"]),
        setRest: (rest) => dispatch(["set-rest", rest]),
        setWork: (work) => dispatch(["set-work", work]),
        startRest: () => dispatch(["start-resting"]),
        startWork: () => dispatch(["start-working"]),
        reset: () => dispatch(["reset"]),
      }}
    />
  );
};
