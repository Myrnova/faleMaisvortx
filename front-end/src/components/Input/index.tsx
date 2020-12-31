import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError: boolean;
}

const Input: React.FC<InputProps> = ({ children, ...rest }) => {
  return (
    <>
      <Container {...rest}>
        <label htmlFor={rest.id}>{children}</label>
        <input {...rest} />
      </Container>
    </>
  );
};

export default Input;
