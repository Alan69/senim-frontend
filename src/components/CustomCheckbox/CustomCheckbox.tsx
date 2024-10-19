import React from 'react';
import { Checkbox } from 'antd';
import './CustomCheckbox.scss';

type TProps = {
  title: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomCheckbox = ({ title, checked, onChange }: TProps) => {
  return (
    // @ts-ignore
    <Checkbox checked={checked} onChange={onChange} className='customCheckbox'>
      {title}
    </Checkbox>
  );
};
