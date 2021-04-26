import React, { FC, useState } from "react";
import { usePom } from "./hooks/use-pom";
import InputNumber, { InputNumberProps } from "./InputNumber";
import "./Config.css";

const MaxInput: FC<{
  initialValue: InputNumberProps["value"];
  label: string;
  onOk: InputNumberProps["onChange"];
}> = ({ label, onOk, initialValue }) => {
  const [max, setMax] = useState(initialValue);

  const handleChange: InputNumberProps["onChange"] = (next) => setMax(next);

  const handleOk = () => onOk(max);

  return (
    <div className="max-input">
      <label className="max-input__label" htmlFor={`${label}-input`}>
        <span className="max-input__label-text">{label}</span>
        <InputNumber
          id={`${label}-input`}
          className="max-input__input"
          onChange={handleChange}
          type="text"
          value={max}
        />
      </label>
      <button className="max-input__button" onClick={handleOk}>
        ✔
      </button>
    </div>
  );
};

const Config: FC = () => {
  const { rest, work, setRest, setWork } = usePom();

  return (
    <>
      <MaxInput initialValue={rest.max} label="rest" onOk={setRest} />
      <MaxInput initialValue={work.max} label="work" onOk={setWork} />
    </>
  );
};

Config.displayName = "Config";

export default Config;
