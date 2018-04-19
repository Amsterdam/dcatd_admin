import React from 'react';
import { Route, Redirect } from 'react-router';
import { Container } from 'semantic-ui-react';

import Header from '../Header/Header';
import DatasetsContainer from '../../containers/DatasetsContainer';
import Modal from '../Modal/Modal';

const App = () => (
  <div>
    <Header />
    <Container className="container-main" >
      <Route
        exact
        path="/"
        render={() => (
          <Redirect to="/datasets" />
        )}
      />
      <Route
        exact
        path="/dcatd_admin"
        render={() => (
          <Redirect to="/datasets" />
        )}
      />
      <Route exact path="/datasets/:id?" component={DatasetsContainer} />
    </Container>
    <Modal />
  </div>
);

export default App;
