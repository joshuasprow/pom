import * as React from "react";
import * as ReactDOM from "react-dom";
import Config from "./Config";
import Controls from "./Controls";
import Info from "./Info";
import { Provider } from "./use-pom";

const style: React.CSSProperties = {
  fontFamily: "monospace",
  borderBottom: "1px solid #aaa",
  padding: "0.5rem",
};

const App: React.FC = () => (
  <Provider>
    <section style={style}>
      <Info />
    </section>
    <section style={style}>
      <Config />
    </section>
    <section style={style}>
      <Controls />
    </section>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("main"));
