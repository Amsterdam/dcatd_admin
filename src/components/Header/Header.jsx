import React from 'react';
import { Container, Header as SemanticHeader } from 'semantic-ui-react';

import { logout } from '../../services/auth/auth';

import Logo from '../../styling/logo.svg';

import './header.scss';

const Header = () => (
  <Container>
    <SemanticHeader size="small" className="header">
      <Logo className="logo" />
      <span className="title">Dataset beheer</span>
      {window.sessionStorage.getItem('DCATD_DETAIL_REDIRECT_URL') || window.sessionStorage.getItem('DCATD_LIST_REDIRECT_URL') ?
        '' :
        <button
          onClick={logout}
        >uitloggen</button>
      }
    </SemanticHeader>
  </Container>
);

export default Header;
