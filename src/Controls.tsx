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
  const rest = 1;
  const work = 3;

  const { remaining, status, pause, startRest, startWork } = usePom({
    defaultRest: rest,
    defaultWork: work,
  });

  return (
    <section style={style.section}>
      <p style={style.p}>status: {status}</p>
      <p style={style.p}>
        rest: {remaining.rest} / {rest}
      </p>
      <p style={style.p}>
        work: {remaining.work} / {work}
      </p>

      <button onClick={pause} style={style.button}>
        pause
      </button>
      <button onClick={startRest} style={style.button}>
        rest
      </button>
      <button onClick={startWork} style={style.button}>
        work
      </button>
    </section>
  );
};

export default Controls;
