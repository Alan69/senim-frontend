import React from "react";
import { Checkbox } from "antd";
import "./CustomCheckbox.scss";

type TProps = {
  title: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export const CustomCheckbox = ({
  title,
  checked,
  onChange,
  disabled,
}: TProps) => {
  return (
    <Checkbox
      checked={checked}
      // @ts-ignore
      onChange={onChange}
      className="customCheckbox"
      disabled={disabled}
    >
      {title}
    </Checkbox>
  );
};
