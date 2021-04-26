import React, { FC } from "react";
import { usePom } from "./use-pom";

const style = {
  display: "block",
  margin: "0.25rem 0",
};

const Info: FC = () => {
  const { status, rest, work } = usePom();

  return (
    <>
      <p style={style}>status: {status}</p>
      <p style={style}>
        rest: {rest.remaining} / {rest.max}
      </p>
      <p style={style}>
        work: {work.remaining} / {work.max}
      </p>
    </>
  );
};

Info.displayName = "Info";

export default Info;
