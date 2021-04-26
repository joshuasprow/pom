import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useReducer,
} from "react";
import reducer, { initialPomState, UsePomState } from "./use-pom-reducer";

const Context = createContext(initialPomState);

Context.displayName = "PomContext";

export const usePom = (): UsePomState => useContext(Context);

export const Provider: FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialPomState);

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
