import styled from 'styled-components';

import celphoneImage from '../../assets/images/backgroundCelular.png';

interface DivPlanProps {
  value: string;
  name: string;
}

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;
  padding: 10px;
  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 20px 0;
    width: 340px;
    text-align: center;

    @media all and (max-width: 400px) {
      justify-content: center;
    }
  }

  #divSelect {
    display: flex;
    flex-wrap: wrap;

    @media all and (max-width: 450px) {
      width: 100%;
    }
  }
`;

export const DivPlan = styled.div<DivPlanProps>`
  border-style: solid;
  border-color: #fff;
  span {
    font-size: 50px;
    display: block;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  @media all and (max-width: 450px) {
    justify-content: center;
    width: 100%;
  }
  @media all and (max-width: 450px) {
    padding: 10px;
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${celphoneImage}) no-repeat center;
  background-size: cover;
`;
