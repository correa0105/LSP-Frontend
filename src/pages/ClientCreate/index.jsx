import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import { ContainerClients } from './styled';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';
import TitlePage from '../../components/TitlePage';

export default function ClientCreate() {
  const [client, setClient] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setClient({ ...client, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const dateConvert = new Date(new Date(client.dateOfBirth).getTime() + 3 * 3600000);
    client.dateOfBirth = dateConvert;
    console.log(client);

    try {
      await axios.post('/clients/', client);
      setClient({});
      navigate('/clients/');
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
    <ContainerClients className="d-flex align-items-start flex-column">
      <TitlePage title="Cadastrar Cliente" />
      <Form className="p-4 rounded mt-4 shadow" onSubmit={(e) => handleSubmit(e)}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="name" placeholder="Seu nome..." onChange={(e) => handleChange(e)} />
          </Form.Group>
          <Form.Group as={Col} controlId="dateOfBirth">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control type="date" name="dateOfBirth" onChange={(e) => handleChange(e)} />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="cpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control type="text" placeholder="Seu cpf..." name="cpf" onChange={(e) => handleChange(e)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="adress">
          <Form.Label>Endereço</Form.Label>
          <Form.Control type="text" name="adress" placeholder="Rua Safira, N 71" onChange={(e) => handleChange(e)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Seu email..." onChange={(e) => handleChange(e)} />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="tel">
            <Form.Label>Celular</Form.Label>
            <Form.Control type="text" name="tel" placeholder="Seu telefone..." onChange={(e) => handleChange(e)} />
          </Form.Group>
          <Form.Group as={Col} controlId="maritalStatus">
            <Form.Label>Estado Civil</Form.Label>
            <Form.Select name="maritalStatus" onChange={(e) => handleChange(e)}>
              <option>Casado</option>
              <option>Solteiro</option>
              <option>Divorciado</option>
              <option>Viuvo</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="occupation">
            <Form.Label>Profissão</Form.Label>
            <Form.Control type="text" name="occupation" placeholder="Sua profissão..." onChange={(e) => handleChange(e)} />
          </Form.Group>
        </Row>
        <Button className="mt-2" variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </ContainerClients>
  );
}
