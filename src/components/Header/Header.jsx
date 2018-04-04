import React from 'react';
import { Container, Header as SemanticHeader } from 'semantic-ui-react';

import Logo from '../../styling/logo.svg';

import './header.scss';

const Header = () => (
  <Container>
    <SemanticHeader size="small" className="header">
      <Logo className="logo" />
      <span className="title">Dataset beheer</span>
    </SemanticHeader>
  </Container>
);

export default Header;
