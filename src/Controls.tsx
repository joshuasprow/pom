import React, { CSSProperties, FC } from "react";
import { usePom } from "./hooks/use-pom";

const style: CSSProperties = {
  display: "inline-block",
};

const Controls: FC = () => {
  const { rest, work, status, pause, startRest, startWork, reset } = usePom();

  const sendProgress = () => {
    let progress: number | null = null;

    if (status === "resting") {
      progress = rest.remaining / rest.max;
    }
    if (status === "working") {
      progress = work.remaining / work.max;
    }

    window.electron.sendProgress(progress);
  };

  return (
    <>
      <button disabled={status === "paused"} onClick={pause} style={style}>
        pause
      </button>
      <button disabled={status === "resting"} onClick={startRest} style={style}>
        rest
      </button>
      <button disabled={status === "working"} onClick={startWork} style={style}>
        work
      </button>
      <button onClick={reset} style={{ ...style, color: "red" }}>
        reset
      </button>
      <button onClick={sendProgress}>send</button>
    </>
  );
};

export default Controls;
