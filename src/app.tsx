import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, useContext } from "./context";

const Controls: React.FC = () => {
  const {
    intervals: { rest, work },
  } = useContext();

  const style: { [key: string]: React.CSSProperties } = {
    p: {
      display: "block",
    },
  };

  return (
    <section>
      <p style={style.p}>rest: {rest}</p>
      <p style={style.p}>work: {work}</p>
    </section>
  );
};

const App: React.FC = () => (
  <Provider>
    <h1>💖 Hello World!</h1>
    <p>Welcome to your Electron application.</p>
    <Controls />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("main"));
