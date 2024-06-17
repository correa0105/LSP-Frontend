import React from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(actions.loginFailure());
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" />}>
          <a href="/home" className="text-decoration-none" style={{ color: 'inherit' }}>
            Advogados Inc
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="/process" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="table">Processos</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/clients" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user">Clientes</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/clients/create" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">+ Clientes</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/logout" onClick={handleLogout} activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="arrow-left">Sair</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px' }}>Adv Inc</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}
