import React, { CSSProperties, FC, useState } from "react";
import InputNumber from "./InputNumber";
import { usePom } from "./use-pom";

const style: { [key: string]: CSSProperties } = {
  button: {
    display: "inline-block",
  },
  div: {
    borderBottom: "1px solid #aaa",
    marginBottom: "0.5rem",
    paddingBottom: "0.5rem",
  },
  label: {
    display: "block",
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
  const {
    rest,
    work,
    status,
    pause,
    setRest,
    setWork,
    startRest,
    startWork,
    reset,
  } = usePom();

  const [nextRest, setNextRest] = useState(rest.max);
  const [nextWork, setNextWork] = useState(work.max);

  return (
    <section style={style.section}>
      <div style={style.div}>
        <p style={style.p}>status: {status}</p>
        <p style={style.p}>
          rest: {rest.remaining} / {rest.max}
        </p>
        <p style={style.p}>
          work: {work.remaining} / {work.max}
        </p>
      </div>

      <div style={style.div}>
        <label htmlFor="rest-input" style={style.label}>
          rest
          <InputNumber
            id="rest-input"
            onChange={setNextRest}
            type="text"
            value={nextRest}
          />
        </label>
        <button onClick={() => setRest(nextRest)}>set rest</button>

        <label htmlFor="work-input" style={style.label}>
          work
          <InputNumber
            id="work-input"
            onChange={setNextWork}
            type="text"
            value={nextWork}
          />
        </label>

        <button onClick={() => setWork(nextWork)}>set work</button>
      </div>

      <div style={style.div}>
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
      </div>
    </section>
  );
};

export default Controls;
