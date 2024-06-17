import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import MainContainer from '../../components/Main';
import { ContainerLogin } from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const [lawyer, setLawyer] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setLawyer({ ...lawyer, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(actions.registerRequest({ lawyer, loginPage: () => navigate('/login') }));
  }

  return (
    <MainContainer>
      <ContainerLogin className="p-4 rounded-3 mt-5">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Nome</Form.Label>
            <Form.Control onChange={(e) => handleChange(e)} name="name" type="text" placeholder="Seu nome" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control onChange={(e) => handleChange(e)} name="cpf" type="text" placeholder="Seu cpf" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>OAB</Form.Label>
            <Form.Control onChange={(e) => handleChange(e)} name="oab" type="text" placeholder="Seu oab" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={(e) => handleChange(e)} name="email" type="email" placeholder="Seu email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control onChange={(e) => handleChange(e)} name="password" type="password" placeholder="Sua senha" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirme Senha</Form.Label>
            <Form.Control onChange={(e) => handleChange(e)} name="confirmpassword" type="password" placeholder="Confirme sua senha" />
          </Form.Group>
          <Button variant="primary" className="w-100" type="submit">
            Registrar-se
          </Button>
        </Form>
      </ContainerLogin>
    </MainContainer>
  );
}
