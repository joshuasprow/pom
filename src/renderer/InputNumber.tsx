import React, {
  ChangeEventHandler,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";

type BaseProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "onChange" | "value"
>;

interface Props extends BaseProps {
  onChange(value: number): void;
  value: number;
}

const InputNumber: FC<Props> = ({ onChange, value, ...props }) => {
  const input = useRef<HTMLInputElement>(null);

  const [numberVal, setNumberVal] = useState(value);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setNumberVal((prev) => {
      const value = event.target.value;

      if (!value) return 0;

      const next = parseInt(value);

      if (isNaN(next)) return prev;

      return next;
    });

  useEffect(() => {
    onChange(numberVal);

    if (numberVal === 0) input.current?.select();
  }, [numberVal]);

  return (
    <input
      {...props}
      onChange={handleChange}
      ref={input}
      value={numberVal.toString()}
    />
  );
};

InputNumber.displayName = "InputNumber";

export default InputNumber;
