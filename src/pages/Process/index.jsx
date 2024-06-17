import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';
import { FaWindowClose } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { ContainerProcess } from './styled';
import axios from '../../services/axios';
import TitlePage from '../../components/TitlePage';
import * as actions from '../../store/modules/auth/actions';

export default function Process() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [processes, setProcesses] = useState([]);
  const [clients, setClients] = useState({});
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    async function getData() {
      try {
        const clientsResponse = await axios.get(`/clients/`);
        const processResponse = await axios.get('/process', {
          params: { type, page, limit: 10 },
        });

        const clientsData = {};

        clientsResponse.data.clients.forEach((client) => {
          clientsData[client.id] = client.name;
        });

        setClients(clientsData);
        setProcesses(processResponse.data.processes);
        setTotalPages(processResponse.data.totalPages);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [page, type]);

  return (
    <ContainerProcess className="d-flex align-items-start flex-column">
      <TitlePage title="Processos" />
      <div className="mt-3 d-flex align-items-center gap-3">
        <label htmlFor="type-all" className="d-flex gap-2">
          <input type="radio" value="" checked={type === ''} onChange={handleTypeChange} />
          Todos
        </label>
        <label htmlFor="type-all" className="d-flex gap-2">
          <input type="radio" value="Judicial" checked={type === 'Judicial'} onChange={handleTypeChange} />
          Judicial
        </label>
        <label htmlFor="type-all" className="d-flex gap-2">
          <input type="radio" value="Extra Judicial" checked={type === 'Extra Judicial'} onChange={handleTypeChange} />
          Extra Judicial
        </label>
      </div>

      <Table variant="dark" striped hover className="mt-4 custom-table">
        <thead>
          <tr>
            <th>Numero</th>
            <th>Cliente Responsavel</th>
            <th>Tipo</th>
            <th>Partes</th>
            <th>Assunto</th>
            <th>Materia</th>
            <th>Data de Abertura</th>
            <th>Menu</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) =>
            clients[process.client_id] ? (
              <tr key={process.id}>
                <td>{process.number}</td>
                <td>{clients[process.client_id]}</td>
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
            ) : null,
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between gap-3 align-items-center" style={{ marginTop: 'auto' }}>
        <button type="submit" disabled={page <= 1} onClick={() => setPage(page - 1)} className="btn btn-primary">
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button type="submit" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="btn btn-primary">
          Próxima
        </button>
      </div>
    </ContainerProcess>
  );
}
