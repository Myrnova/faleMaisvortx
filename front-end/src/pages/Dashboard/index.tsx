import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Modal from 'react-modal';
import { Container, Background, Content } from './styles';
import RadioButton from '../../components/RadioButton/index';
import Button from '../../components/Button/index';
import api from '../../services/api';
import Select from '../../components/Select/index';
import getValidationErrors from '../../utils/getValidationErros';

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [values, setValues] = useState('');

  const [inputError, setInputError] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const [plan, setPlan] = useState('');

  const [origin, setOrigin] = useState('');

  const [destiny, setDestiny] = useState('');

  const radioChangeHandler = useCallback(event => {
    setPlan(event.target.value);
  }, []);

  const originChangeHandler = useCallback((data: string) => {
    setOrigin(data.toString());
  }, []);

  const destinyChangeHandler = useCallback((data: string) => {
    setDestiny(data.toString());
  }, []);
  /*  const handleSearchPrice = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        plan: Yup.string().required('É necessário selecionar um plano'),
        origin: Yup.string().required(
          'É necessário selecionar o DDD de origem',
        ),
        destiny: Yup.string().required(
          'É necessário selecionar o DDD de destino',
        ),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      handleReturnPrice(data);
    } catch (error) {
      console.log(error);
      const errors = getValidationErrors(error);
      formRef.current?.setErrors(errors);
    }
  }, []); */

  const handleReturnPrice = useCallback(async event => {
    event.preventDefault();
    console.log(origin, destiny, plan);
    try {
      const response = await api.post<string>('/price', {
        origin,
        destiny,
        time: '0',
        plan,
      });
      if (response.data === '-') setValues('Combinação de DDD não encontrada');
      else setValues(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('Erro');
    }
  }, []);

  const closeModal = useCallback(event => {
    setOpenModal(false);
  }, []);

  return (
    <>
      <Container>
        <Content>
          <form>
            <div id="divSelect">
              <Select name="origin" valueSelected={originChangeHandler}>
                DDD Origem
              </Select>
              <Select name="destiny" valueSelected={destinyChangeHandler}>
                DDD Destino
              </Select>
            </div>
            <div id="plan" onChange={radioChangeHandler}>
              <span>Planos</span>
              <div>
                <RadioButton id="FaleMais30" value="30" name="plan">
                  FaleMais 30
                </RadioButton>
                <RadioButton id="FaleMais60" value="60" name="plan">
                  FaleMais 60
                </RadioButton>
                <RadioButton id="FaleMais120" value="120" name="plan">
                  FaleMais 120
                </RadioButton>
              </div>
            </div>
            <Button type="submit" onClick={handleReturnPrice}>
              Gerar preço
            </Button>
          </form>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default Dashboard;
