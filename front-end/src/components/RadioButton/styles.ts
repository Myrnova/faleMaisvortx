import styled from 'styled-components';

export const Container = styled.div`
  margin: 20px 0px;
  text-align: center;
  width: auto;
  input {
    margin: 20px;
  }
  input:after {
    width: 20px;
    height: 20px;
    margin-right: 20px;
    border-radius: 15px;
    top: -2px;
    left: -5px;
    position: relative;
    background-color: #d1d3d1;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
  }

  input:checked:after {
    width: 20px;
    height: 20px;
    border-radius: 15px;
    top: -2px;
    left: -5px;
    position: relative;
    background-color: #c12c2c;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
  }

  label {
    margin-right: 10px;
    font-size: 20px;
    padding-top: 20px;
  }
`;
