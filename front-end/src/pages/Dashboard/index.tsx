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
import { Container, Background, Content, DivPlan } from './styles';
import RadioButton from '../../components/RadioButton/index';
import Button from '../../components/Button/index';
import api from '../../services/api';
import Select from '../../components/Select/index';
import getValidationErrors from '../../utils/getValidationErros';

interface InputUserValues {
  origin: string;
  destiny: string;
  plan: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [values, setValues] = useState({});

  const [inputError, setInputError] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const [plan, setPlan] = useState('');

  const [origin, setOrigin] = useState('');

  const [destiny, setDestiny] = useState('');

  useEffect(() => {
    console.log(origin, destiny, plan);
  }, [origin, destiny, plan]);

  const handleReturnPrice = useCallback(
    async (event, sendOrigin, sendDestiny, sendPlan) => {
      event.preventDefault;
      try {
        const response = await api.post<string>('/price', {
          origin: sendOrigin,
          destiny: sendDestiny,
          time: '0',
          plan: sendPlan,
        });
        if (response.data === '-')
          setValues('Combinação de DDD não encontrada');
        else setValues(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Erro');
      }
    },
    [],
  );

  const radioChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPlan(event.target.value);
    },
    [],
  );

  const originChangeHandler = useCallback((data: string) => {
    setOrigin(data);
  }, []);

  const destinyChangeHandler = useCallback((data: string) => {
    setDestiny(data);
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

  /*   const closeModal = useCallback(event => {
    setOpenModal(false);
  }, []);
 */
  return (
    <>
      <Container>
        <Content>
          <Form
            ref={formRef}
            onSubmit={event => handleReturnPrice(event, origin, destiny, plan)}
            /* nSubmit={() => {
              handleReturnPrice(origin, destiny, plan);
            }} */
          >
            <div id="divSelect">
              <Select
                name="origin"
                value={origin}
                valueSelected={originChangeHandler}
              >
                DDD Origem
              </Select>
              <Select
                name="destiny"
                value={destiny}
                valueSelected={destinyChangeHandler}
              >
                DDD Destino
              </Select>
            </div>
            <DivPlan
              name="plan"
              value={plan}
              id="plan"
              onChange={radioChangeHandler}
            >
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
            </DivPlan>
            <Button type="submit">Gerar preço</Button>
          </Form>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default Dashboard;
