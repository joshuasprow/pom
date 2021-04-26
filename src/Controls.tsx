import React, { CSSProperties, FC } from "react";
import { usePom } from "./use-pom";

const style: CSSProperties = {
  display: "inline-block",
};

const sendProgress = () => {
  window.electron.sendProgress();
};

const Controls: FC = () => {
  const { status, pause, startRest, startWork, reset } = usePom();

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
