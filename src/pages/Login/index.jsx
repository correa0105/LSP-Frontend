import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainContainer from '../../components/Main';
import { ContainerLogin } from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Login() {
  const [lawyer, setLawyer] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setLawyer({ ...lawyer, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(actions.loginRequest({ lawyer, loginPage: () => navigate('/process') }));
  }

  return (
    <MainContainer>
      <ContainerLogin className="p-4 rounded-3 mt-5">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>OAB</Form.Label>
            <Form.Control onChange={(e) => handleChange(e)} name="oab" type="text" placeholder="Seu email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control onChange={(e) => handleChange(e)} name="password" type="password" placeholder="Sua senha" />
          </Form.Group>
          <Button variant="primary" className="w-100" type="submit">
            Login
          </Button>
        </Form>
      </ContainerLogin>
    </MainContainer>
  );
}
