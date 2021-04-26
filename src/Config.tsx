import React, { FC, useState } from "react";
import InputNumber from "./InputNumber";
import { usePom } from "./use-pom";

const Config: FC = () => {
  const { rest, work, setRest, setWork } = usePom();

  const [nextRest, setNextRest] = useState(rest.max);
  const [nextWork, setNextWork] = useState(work.max);

  return (
    <>
      <label htmlFor="rest-input" style={{ display: "block" }}>
        rest
        <InputNumber
          id="rest-input"
          onChange={setNextRest}
          type="text"
          value={nextRest}
        />
      </label>
      <button onClick={() => setRest(nextRest)}>set rest</button>

      <label htmlFor="work-input" style={{ display: "block" }}>
        work
        <InputNumber
          id="work-input"
          onChange={setNextWork}
          type="text"
          value={nextWork}
        />
      </label>

      <button onClick={() => setWork(nextWork)}>set work</button>
    </>
  );
};

Config.displayName = "Config";

export default Config;
