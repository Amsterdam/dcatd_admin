import React from 'react';
import { Route, Redirect } from 'react-router';
import { Container } from 'semantic-ui-react';

import Header from '../components/Header/Header';
import DatasetsContainer from '../containers/DatasetsContainer';
import Modal from '../components/Modal/Modal';

const App = () => (
  <div>
    <Header />
    <Container className="container-main" >
      <Route
        exact
        path="/"
        render={() => (
          <Redirect to="/dcatd_admin/datasets" />
        )}
      />
      <Route
        exact
        path="/dcatd_admin"
        render={() => (
          <Redirect to="/dcatd_admin/datasets" />
        )}
      />
      <Route exact path="/dcatd_admin/datasets/:id?" component={DatasetsContainer} />
    </Container>
    <Modal />
  </div>
);

export default App;
