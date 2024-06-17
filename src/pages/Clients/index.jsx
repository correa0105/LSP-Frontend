import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { format } from 'date-fns';
import { FaWindowClose } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { ContainerClients } from './styled';
import axios from '../../services/axios';
import TitlePage from '../../components/TitlePage';
import * as actions from '../../store/modules/auth/actions';

export default function Clients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const formatCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleDelete = async (event, clientId) => {
    event.preventDefault();

    try {
      event.currentTarget.parentElement.parentElement.parentElement.remove();

      await axios.delete(`/clients/${clientId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    async function getData(search = '', page = 1, pageSize = 10) {
      try {
        const response = await axios.get('/clients/', {
          params: { search, page, limit: pageSize },
        });
        setClients(response.data.clients);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
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

    getData(searchTerm, currentPage, limit);
  }, [searchTerm, currentPage, limit, dispatch, navigate]);

  return (
    <ContainerClients className="d-flex align-items-start flex-column">
      <TitlePage title="Clientes" />
      <input type="text" placeholder="Buscar clientes..." onChange={handleSearchChange} className="form-control mt-4 mb-4" />
      <Table variant="dark" striped hover className="mt-3 custom-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>CPF</th>
            <th>Tel</th>
            <th>Email</th>
            <th>Menu</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>
                <Link to={`/clients/${client.id}`}>{client.name}</Link>
              </td>
              <td>{format(new Date(client.dateOfBirth), 'dd/MM/yyyy')}</td>
              <td>{formatCPF(client.cpf)}</td>
              <td>{client.tel}</td>
              <td>{client.email}</td>
              <td>
                <div className="d-flex gap-2">
                  {/* <Link to={`/clients/myclients/${client.id}`}>
                    <FaEdit color="var(--others)" size={17} />
                  </Link> */}
                  <FaWindowClose type="submit" onClick={(event) => handleDelete(event, client.id)} color="var(--others)" size={17} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between gap-3 align-items-center" style={{ marginTop: 'auto' }}>
        <button
          type="button"
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          type="button"
          className="btn btn-primary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Próxima
        </button>
      </div>
    </ContainerClients>
  );
}
