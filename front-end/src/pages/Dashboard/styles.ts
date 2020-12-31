import styled from 'styled-components';

import celphoneImage from '../../assets/images/backgroundCelular.png';

interface DivPlanProps {
  value: string;
  name: string;
  hasError: boolean;
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
  p {
    font-size: 50px;
    display: block;
  }
  span:nth-child(2) {
    font-size: 16px !important;
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

export const Error = styled.span`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  color: #fff;
  background-color: #c53030;
  margin-top: 8px;
  margin-bottom: 10px;
`;

export const StylesModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: '#000000',
    height: 'auto',
    maxWidth: '1000px',
    with: 'auto',

    span: {
      display: 'inline-block',
    },
  },
};

export const DivExistsCombination = styled.div`
  display: flex;
  flex-direction: column;

  #wrapper {
    display: flex;
    padding: 10px;
  }
  h2 {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  div {
    font-size: 20px;
    padding: 10px;
    flex: 1;

    span {
      color: #c53030;
      margin-left: 2px;
      margin-right: 2px;
    }
  }

  .price {
    display: block;
    font-size: 40px;
    color: #157811;
    padding: 10px;
  }
`;
export const DivDoesntExistCombination = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 30px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
  span {
    display: block;
    margin-bottom: 10px;
    font-size: 20px;
    color: #c53030;
  }
`;
