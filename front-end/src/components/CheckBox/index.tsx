import React, { InputHTMLAttributes, useState } from 'react';
import {
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Text,
} from './styles';

type CheckProps = InputHTMLAttributes<HTMLInputElement>;

const CheckBox: React.FC<CheckProps> = ({ children, ...rest }) => {
  const [checked, setChecked] = useState(false);

  function handleCheckboxChange() {
    setChecked(!checked);
  }
  return (
    <>
      <CheckboxContainer
        {...rest}
        checked={checked}
        onClick={handleCheckboxChange}
      >
        <HiddenCheckbox checked={checked} onChange={handleCheckboxChange} />
        <Text checked={checked}>{children}</Text>
      </CheckboxContainer>
    </>
  );
};

export default CheckBox;
