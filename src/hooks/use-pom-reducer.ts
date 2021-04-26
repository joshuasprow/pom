import { Reducer } from "react";
import { UsePomAction } from "./use-pom-actions";

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
      return { ...state, status: "paused" };
    case "rest":
      if (state.rest.remaining === 0) {
        return { ...state, status: "paused" };
      }
      return {
        ...state,
        rest: { ...state.rest, remaining: state.rest.remaining - 1 },
      };
    case "work":
      if (state.work.remaining === 0) {
        return { ...state, status: "paused" };
      }
      return {
        ...state,
        work: { ...state.work, remaining: state.work.remaining - 1 },
      };
    case "set-rest": {
      let remaining = state.rest.remaining;
      const max =
        typeof value === "number" ? value : initialPomState.rest.remaining;

      if (remaining >= max) remaining = max;

      return { ...state, status: "paused", rest: { remaining, max } };
    }
    case "set-work": {
      let remaining = state.work.remaining;
      const max =
        typeof value === "number" ? value : initialPomState.work.remaining;

      if (remaining >= max) remaining = max;

      return { ...state, status: "paused", work: { remaining, max } };
    }
    case "start-resting":
      return { ...state, status: "resting" };
    case "start-working":
      return { ...state, status: "working" };
    case "reset": {
      const { rest, work } = state;

      return {
        ...initialPomState,
        rest: { ...rest, remaining: rest.max },
        work: { ...work, remaining: work.max },
      };
    }
    default:
      throw new Error(`No handler for action type: ${type}`);
  }
};

export default reducer;
