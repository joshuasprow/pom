import React, { CSSProperties, FC } from "react";
import { usePom } from "./use-pom";

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

const Controls: FC = () => {
  const { rest, work, status, pause, startRest, startWork, reset } = usePom();

  return (
    <section style={style.section}>
      <p style={style.p}>status: {status}</p>
      <p style={style.p}>
        rest: {rest.remaining} / {rest.max}
      </p>
      <p style={style.p}>
        work: {work.remaining} / {work.max}
      </p>

      <button
        disabled={status === "paused"}
        onClick={pause}
        style={style.button}
      >
        pause
      </button>
      <button
        disabled={status === "resting"}
        onClick={startRest}
        style={style.button}
      >
        rest
      </button>
      <button
        disabled={status === "working"}
        onClick={startWork}
        style={style.button}
      >
        work
      </button>
      <button onClick={reset} style={{ ...style.button, color: "red" }}>
        reset
      </button>
    </section>
  );
};

export default Controls;
