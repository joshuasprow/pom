import * as React from "react";
import * as ReactDOM from "react-dom";
import Controls from "./Controls";
import { Provider } from "./use-pom";

const App: React.FC = () => (
  <Provider>
    <Controls />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("main"));
