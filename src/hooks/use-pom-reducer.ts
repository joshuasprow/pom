import { Reducer } from "react";
import {
  pauseAction,
  resetAction,
  restAction,
  setRestAction,
  setWorkAction,
  startRestingAction,
  startWorkingAction,
  UsePomAction,
  workAction,
} from "./use-pom-actions";

type Status = "paused" | "resting" | "working";

export const initialPomState = {
  rest: { max: 1, remaining: 1 },
  work: { max: 3, remaining: 3 },
  status: "paused" as Status,
  pause(): void {
    //
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setRest(rest: number): void {
    //
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setWork(work: number): void {
    //
  },
  startRest(): void {
    //
  },
  startWork(): void {
    //
  },
  reset(): void {
    //
  },
};

export type UsePomState = typeof initialPomState;

const reducer: Reducer<UsePomState, UsePomAction> = (state, [type, value]) => {
  switch (type) {
    case "pause":
      return pauseAction(state, value);
    case "rest":
      return restAction(state, value);
    case "work":
      return workAction(state, value);
    case "set-rest":
      return setRestAction(state, value);
    case "set-work":
      return setWorkAction(state, value);
    case "start-resting":
      return startRestingAction(state, value);
    case "start-working":
      return startWorkingAction(state, value);
    case "reset":
      return resetAction(state, value);
    default:
      throw new Error(`No handler for action type: ${type}`);
  }
};

export default reducer;
