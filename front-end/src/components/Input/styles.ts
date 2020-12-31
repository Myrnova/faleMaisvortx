import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface InputProps {
  hasError: boolean;
}

export const Container = styled.div<InputProps>`
  margin: 20px 20px;
  width: 340px;
  text-align: center;
  display: flex;
  flex-direction: column;
  label {
    font-size: 20px;
    margin-top: 10px;
    display: inline-block;
    margin-bottom: 20px;
    border-bottom: 1px solid #c12c2c !important;
  }

  input {
    border-radius: 5px;
    height: 50px;
    padding: 10px;

    ${props =>
      props.hasError &&
      css`
        border-color: #c53030;
      `};
  }
`;
