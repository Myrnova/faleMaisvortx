import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Container } from './styles';

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  valueSelected(name: string): void;
}

const SelectDDD: React.FC<SelectProps> = ({ children, ...props }) => {
  const [optionSelected, setOptionSelected] = useState('Default');
  const selectDDD = [
    { value: '011', label: 'DDD 011' },
    { value: '016', label: 'DDD 016' },
    { value: '017', label: 'DDD 017' },
    { value: '018', label: 'DDD 018' },
  ];

  const selectedValueHandler = useCallback(event => {
    setOptionSelected(event.target.value);
  }, []);

  useEffect(() => {
    props.valueSelected(optionSelected);
  }, [optionSelected]);

  return (
    <>
      <Container>
        <span>{children}</span>
        <select value={optionSelected} onChange={selectedValueHandler}>
          <option key="Default" value="Default" disabled>
            Seleciona um DDD
          </option>
          {selectDDD.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Container>
    </>
  );
};

export default SelectDDD;
