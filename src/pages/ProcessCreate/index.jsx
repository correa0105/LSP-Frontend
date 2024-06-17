import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { get } from 'lodash';
import { ContainerProcess } from './styled';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';
import TitlePage from '../../components/TitlePage';

export default function ProcessCreate() {
  const [process, setProcess] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setProcess({ ...process, [e.target.name]: e.target.value });
    console.log(process);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const processToSubmit = { ...process, clientId: id };

    try {
      await axios.post('/process/', processToSubmit);
      setProcess({});
      navigate(`/clients/${id}`);
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        navigate('/login');
        dispatch(actions.loginFailure());
      }

      console.log(errors);
    }
  }

  return (
    <ContainerProcess className="d-flex align-items-start flex-column">
      <TitlePage title="Cadastrar Processo" />
      <Form className="p-4 rounded mt-4 shadow" onSubmit={(e) => handleSubmit(e)}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="number">
            <Form.Label>Numero</Form.Label>
            <Form.Control type="text" name="number" placeholder="Numero do processo..." onChange={(e) => handleChange(e)} />
          </Form.Group>
          <Form.Group as={Col} controlId="parts">
            <Form.Label>Partes do Processo</Form.Label>
            <Form.Control type="text" placeholder="Pessoas envolvidas..." name="parts" onChange={(e) => handleChange(e)} />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Assunto</Form.Label>
          <Form.Control type="text" placeholder="Assunto do processo..." name="subject" onChange={(e) => handleChange(e)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="matter">
          <Form.Label>Matéria</Form.Label>
          <Form.Control type="text" name="matter" placeholder="Matéria do processo..." onChange={(e) => handleChange(e)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="type">
          <Form.Label>Tipo de Processo</Form.Label>
          <div className="d-flex flex-column gap-2">
            <Form.Check
              type="radio"
              id="type-judicial"
              name="type"
              value="Judicial"
              label="Judicial"
              onChange={(e) => handleChange(e)}
              className="d-flex align-items-center gap-2"
            />
            <Form.Check
              type="radio"
              id="type-extra-judicial"
              name="type"
              value="Extra Judicial"
              label="Extra Judicial"
              onChange={(e) => handleChange(e)}
              className="d-flex align-items-center gap-2"
            />
          </div>
        </Form.Group>
        <Button className="mt-2" variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </ContainerProcess>
  );
}
