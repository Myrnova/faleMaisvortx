import styled, { css } from 'styled-components';

interface SelectProps {
  hasError: boolean;
}

export const Container = styled.div<SelectProps>`
  margin: 20px 20px;
  width: 340px;
  text-align: center;
  display: flex;
  flex-direction: column;
  /*   span {
    font-size: 20px;
    margin-top: 10px;
    display: inline-block;
    margin-bottom: 20px;
    border-bottom: 1px solid #c12c2c !important;
  } */

  select {
    border-radius: 5px;
    height: 50px;
    padding: 10px;

    ${props =>
      props.hasError &&
      css`
        border-color: #c53030;
      `};
  }

  .Default {
    color: #8e8e8e;
  }
`;
