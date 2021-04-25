import React, {
  CSSProperties,
  FC,
  Reducer,
  useEffect,
  useReducer,
} from "react";

type Status = "paused" | "resting" | "working";

const style: { [key: string]: CSSProperties } = {
  button: {
    display: "inline-block",
  },
  p: {
    display: "block",
    margin: "0.25rem 0",
  },
  section: {
    fontFamily: "monospace",
  },
};

interface State {
  remaining: {
    rest: number;
    work: number;
  };
  status: Status;
}

type Action = "rest" | "work" | "pause" | "start-resting" | "start-working";

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

const Controls: FC = () => {
  const rest = 1;
  const work = 3;

  const [{ remaining, status }, dispatch] = useReducer(reducer, {
    remaining: { rest, work },
    status: "paused",
  });

  useEffect(() => {
    const interval = setInterval((): void => {
      switch (status) {
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
  }, [status]);

  return (
    <section style={style.section}>
      <p style={style.p}>status: {status}</p>
      <p style={style.p}>
        rest: {remaining.rest} / {rest}
      </p>
      <p style={style.p}>
        work: {remaining.work} / {work}
      </p>

      <button onClick={() => dispatch("pause")} style={style.button}>
        pause
      </button>
      <button onClick={() => dispatch("start-resting")} style={style.button}>
        rest
      </button>
      <button onClick={() => dispatch("start-working")} style={style.button}>
        work
      </button>
    </section>
  );
};

export default Controls;
