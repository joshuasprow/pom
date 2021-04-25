import * as React from "react";

const initialState = {
  intervals: {
    work: 50,
    rest: 10,
  },
};

export type State = typeof initialState;

const Context = React.createContext<State>(initialState);

export const Provider: React.FC = (props) => (
  <Context.Provider {...props} value={initialState} />
);

export const useContext = (): State => React.useContext(Context);
