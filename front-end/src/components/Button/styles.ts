import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #c12c2c;
  color: #fff;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
  box-shadow: 2px 2px 5px black;

  &:hover {
    background: ${shade(0.2, '#c12c2c')};
  }
  @media all and (max-width: 450px) {
    width: 100%;
  }
`;
