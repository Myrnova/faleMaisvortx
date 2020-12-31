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
import {
  Container,
  Background,
  Content,
  DivPlan,
  Error,
  StylesModal,
  DivDoesntExistCombination,
  DivExistsCombination,
} from './styles';
import RadioButton from '../../components/RadioButton/index';
import Button from '../../components/Button/index';
import Input from '../../components/Input/index';
import api from '../../services/api';
import Select from '../../components/Select/index';
import getValidationErrors from '../../utils/getValidationErros';

interface InputUserValues {
  origin: string;
  destiny: string;
  plan: string;
}

interface ValueReturned {
  valueWithPlan: string;
  valueWithoutPlan: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [values, setValues] = useState<ValueReturned | null>(null);

  const [minutesInputError, setMinutesInputError] = useState('');

  const [originSelectError, setOriginSelectError] = useState('');

  const [destinySelectError, setDestinySelectError] = useState('');

  const [planOptionError, setPlanOptionError] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const [inputMinutes, setInputMinutes] = useState('');

  const [inputPlan, setInputPlan] = useState('');

  const [inputOrigin, setInputOrigin] = useState('');

  const [inputDestiny, setInputDestiny] = useState('');

  const radioChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputPlan(event.target.value);
      setPlanOptionError('');
    },
    [],
  );

  const originChangeHandler = useCallback((data: string) => {
    setInputOrigin(data);
    setOriginSelectError('');
  }, []);

  const destinyChangeHandler = useCallback((data: string) => {
    setInputDestiny(data);
    setDestinySelectError('');
  }, []);

  const handleValidate = useCallback(
    async (event, sendOrigin, sendDestiny, sendPlan, sendMinutes) => {
      console.log(sendOrigin, sendDestiny, sendPlan, sendMinutes);
      event.preventDefault;
      const inputData = {
        inputOrigin: sendOrigin,
        inputDestiny: sendDestiny,
        inputMinutes: sendMinutes,
        inputPlan: sendPlan,
      };
      try {
        const schema = Yup.object().shape({
          inputPlan: Yup.string().required('É necessário selecionar um plano'),
          inputOrigin: Yup.string()
            .required()
            .notOneOf(['Default'], 'É necessário selecionar o DDD de origem'),
          inputDestiny: Yup.string()
            .required()
            .notOneOf(['Default'], 'É necessário selecionar o DDD de destino'),
          inputMinutes: Yup.string().required(
            'É necessário informar os minutos da ligação',
          ),
        });
        await schema.validate(inputData, {
          abortEarly: false,
        });
        handleReturnPrice(inputData);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          setMinutesInputError(errors.inputMinutes);
          setOriginSelectError(errors.inputOrigin);
          setDestinySelectError(errors.inputDestiny);
          setPlanOptionError(errors.inputPlan);
        }
      }
    },
    [],
  );
  const handleReturnPrice = useCallback(async data => {
    try {
      const response = await api.post<ValueReturned>('/price', {
        origin: data.inputOrigin,
        destiny: data.inputDestiny,
        time: parseInt(data.inputMinutes, 10),
        plan: parseInt(data.inputPlan, 10),
      });
      setValues(response.data);
      setOpenModal(true);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const closeModal = useCallback(event => {
    setOpenModal(false);
  }, []);

  return (
    <>
      <Container>
        <Content>
          <Form
            ref={formRef}
            onSubmit={event => {
              handleValidate(
                event,
                inputOrigin,
                inputDestiny,
                inputPlan,
                inputMinutes,
              );
            }}
          >
            <div id="divSelect">
              <Select
                name="inputOrigin"
                value={inputOrigin}
                valueSelected={originChangeHandler}
                hasError={!!originSelectError}
              >
                DDD Origem
              </Select>
              {originSelectError && <Error>{originSelectError}</Error>}

              <Select
                name="inputDestiny"
                value={inputDestiny}
                valueSelected={destinyChangeHandler}
                hasError={!!destinySelectError}
              >
                DDD Destino
              </Select>
              {destinySelectError && <Error>{destinySelectError}</Error>}
            </div>
            <div>
              <Input
                name="inputMinutes"
                id="inputMinutes"
                placeholder="Tempo de ligação em minutos"
                type="number"
                min="1"
                value={inputMinutes}
                onChange={event => {
                  setInputMinutes(event.target.value);
                  setMinutesInputError('');
                }}
                hasError={!!minutesInputError}
              >
                Tempo ligação(minutos)
              </Input>
              {minutesInputError && <Error>{minutesInputError}</Error>}
            </div>

            <DivPlan
              name="inputPlan"
              value={inputPlan}
              id="plan"
              onChange={radioChangeHandler}
              hasError={!!planOptionError}
            >
              <p>Planos</p>
              <div>
                <RadioButton id="FaleMais30" value="30" name="inputPlan">
                  FaleMais 30
                </RadioButton>
                <RadioButton id="FaleMais60" value="60" name="inputPlan">
                  FaleMais 60
                </RadioButton>
                <RadioButton id="FaleMais120" value="120" name="inputPlan">
                  FaleMais 120
                </RadioButton>
                {planOptionError && <Error>{planOptionError}</Error>}
              </div>
            </DivPlan>
            <Button type="submit">Gerar preço</Button>
          </Form>
        </Content>
        <Background />

        <Modal
          isOpen={openModal}
          onRequestClose={closeModal}
          contentLabel="Resultado da pesquisa"
          appElement={document.getElementById('root') as HTMLElement}
          style={StylesModal}
        >
          {values?.valueWithPlan === '-' ? (
            <>
              <DivDoesntExistCombination>
                <h2>Resultado da pesquisa</h2>
                <span>Combinação de DDD não existente</span>
              </DivDoesntExistCombination>
            </>
          ) : (
            <>
              <DivExistsCombination>
                <h2>Resultado da pesquisa</h2>
                <div id="wrapper">
                  <div>
                    Com Plano FaleMais
                    <span>
                      {inputPlan}
                      &nbsp;
                    </span>
                    ligações de
                    <span>
                      &nbsp;
                      {inputMinutes}
                      &nbsp;
                    </span>
                    minutos do DDD
                    <span>
                      &nbsp;
                      {inputOrigin}
                      &nbsp;
                    </span>
                    para o DDD
                    <span>
                      &nbsp;
                      {inputDestiny}
                      &nbsp;
                    </span>
                    custará:
                    <span className="price">{values?.valueWithPlan}</span>
                  </div>
                  <div>
                    <p>
                      Sem Plano FaleMais
                      <span>
                        {inputPlan}
                        &nbsp;
                      </span>
                      ligações de
                      <span>
                        &nbsp;
                        {inputMinutes}
                        &nbsp;
                      </span>
                      minutos do DDD
                      <span>
                        &nbsp;
                        {inputOrigin}
                        &nbsp;
                      </span>
                      para o DDD
                      <span>
                        &nbsp;
                        {inputDestiny}
                        &nbsp;
                      </span>
                      custará:
                    </p>
                    <span className="price">{values?.valueWithoutPlan}</span>
                  </div>
                </div>
              </DivExistsCombination>
            </>
          )}
          <Button type="button" onClick={closeModal}>
            Fechar Modal
          </Button>
        </Modal>
      </Container>
    </>
  );
};

export default Dashboard;
