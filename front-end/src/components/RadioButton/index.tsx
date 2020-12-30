import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

type RadioProps = InputHTMLAttributes<HTMLInputElement>;

const RadioButton: React.FC<RadioProps> = ({ children, ...rest }) => {
  return (
    <>
      <Container>
        <input type="radio" name="inlineRadioOptions" {...rest} />
        <label htmlFor={rest.id}>{children}</label>
      </Container>
    </>
  );
};

export default RadioButton;
