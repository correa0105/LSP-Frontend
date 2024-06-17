import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';
import { FaWindowClose } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { ContainerClient } from './styled';
import axios from '../../services/axios';
import TitlePage from '../../components/TitlePage';
import * as actions from '../../store/modules/auth/actions';

export default function Client() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [client, setClient] = useState({});
  const [processes, setProcesses] = useState([]);
  const { id } = useParams();

  const formatCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleDelete = async (event, processId) => {
    event.preventDefault();

    try {
      event.currentTarget.parentElement.parentElement.parentElement.remove();

      await axios.delete(`/process/${processId}`);
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      const status = get(err, 'response.status', 0);

      if (status === 401) {
        navigate('/login');
        dispatch(actions.loginFailure());
      }

      console.log(errors);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const clientResponse = await axios.get(`/clients/${id}`);
        const processesResponse = await axios.get(`/process/myprocess/${id}`);
        setClient(clientResponse.data[0]);
        setProcesses(processesResponse.data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [id]);

  return (
    <ContainerClient className="d-flex align-items-start flex-column">
      <TitlePage title={client.name} />
      <div className="rounded w-50 mt-3 p-4 shadow d-flex flex-column gap-2" style={{ background: 'white' }}>
        <Form.Group className="d-flex align-items-center gap-3" controlId="adress">
          <Form.Label
            className="mb-0 text-white d-flex align-items-center ps-3 p-2 fs-4 w-25 rounded"
            style={{ background: '#333333', height: '3.5rem' }}
          >
            CPF
          </Form.Label>
          <Form.Control className="p-3 w-25" type="text" name="adress" value={`${formatCPF(client.cpf)}`} />
        </Form.Group>
        <Form.Group className="d-flex align-items-center gap-3" controlId="adress">
          <Form.Label
            className="mb-0 text-white d-flex align-items-center ps-3 p-2 fs-4 w-25 rounded"
            style={{ background: '#333333', height: '3.5rem' }}
          >
            Telefone
          </Form.Label>
          <Form.Control className="p-3 w-25" type="text" name="adress" value={client.tel} />
        </Form.Group>
        <Form.Group className="d-flex align-items-center gap-3" controlId="adress">
          <Form.Label
            className="mb-0 text-white d-flex align-items-center ps-3 p-2 fs-4 w-25 rounded"
            style={{ background: '#333333', height: '3.5rem' }}
          >
            Email
          </Form.Label>
          <Form.Control className="p-3 w-25" type="text" name="adress" value={client.email} />
        </Form.Group>
        <Form.Group className="d-flex align-items-center gap-3" controlId="adress">
          <Form.Label
            className="mb-0 text-white d-flex align-items-center ps-3 p-2 fs-4 w-25 rounded"
            style={{ background: '#333333', height: '3.5rem' }}
          >
            Data de Nascimento
          </Form.Label>
          <Form.Control
            className="p-3 w-25"
            type="text"
            name="adress"
            value={`${client.dateOfBirth && format(new Date(client.dateOfBirth), 'dd/MM/yyyy')}`}
          />
        </Form.Group>
        <Form.Group className="d-flex align-items-center gap-3" controlId="adress">
          <Form.Label
            className="mb-0 text-white d-flex align-items-center ps-3 p-2 fs-4 w-25 rounded"
            style={{ background: '#333333', height: '3.5rem' }}
          >
            Endereço
          </Form.Label>
          <Form.Control className="p-3 w-25" type="text" name="adress" value={client.adress} />
        </Form.Group>
        <Form.Group className="d-flex align-items-center gap-3" controlId="adress">
          <Form.Label
            className="mb-0 text-white d-flex align-items-center ps-3 p-2 fs-4 w-25 rounded"
            style={{ background: '#333333', height: '3.5rem' }}
          >
            Estado Civil
          </Form.Label>
          <Form.Control className="p-3 w-25" type="text" name="adress" value={client.maritalStatus} />
        </Form.Group>
        <Form.Group className="d-flex align-items-center gap-3" controlId="adress">
          <Form.Label
            className="mb-0 text-white d-flex align-items-center ps-3 p-2 fs-4 w-25 rounded"
            style={{ background: '#333333', height: '3.5rem' }}
          >
            Profissão
          </Form.Label>
          <Form.Control className="p-3 w-25" type="text" name="adress" value={client.occupation} />
        </Form.Group>
      </div>
      <Link className="w-25 mt-auto p-3 btn btn-primary" to={`/process/${id}`}>
        Abrir Processo
      </Link>
      <div className="bg-white h-50 rounded mt-4 w-100">
        <Table variant="dark" striped hover className="custom-table">
          <thead>
            <tr>
              <th>Numero</th>
              <th>Tipo</th>
              <th>Partes</th>
              <th>Assunto</th>
              <th>Materia</th>
              <th>Data de Abertura</th>
              <th>Menu</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process) => (
              <tr key={process.id}>
                <td>{process.number}</td>
                <td>{process.type}</td>
                <td>{process.parts}</td>
                <td>{process.subject}</td>
                <td>{process.matter}</td>
                <td>{format(new Date(process.created_at), 'dd/MM/yyyy')}</td>
                <td>
                  <div className="d-flex gap-2">
                    {/* <Link to={`/process/${process.id}`}>
                      <FaEdit color="var(--others)" size={17} />
                    </Link> */}
                    <FaWindowClose
                      type="submit"
                      onClick={(event) => handleDelete(event, process.id)}
                      color="var(--others)"
                      size={17}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </ContainerClient>
  );
}
