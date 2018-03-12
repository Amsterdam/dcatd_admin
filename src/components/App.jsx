import React from 'react';
import { Route, Redirect } from 'react-router';
import { Container } from 'semantic-ui-react';

import Header from '../components/Header';
import DatasetsContainer from '../containers/DatasetsContainer';

const App = () => (
  <div>
    <Header />
    <Container style={{ marginTop: '7em' }}>
      <Route
        exact
        path="/"
        render={() => (
          <Redirect to="/dcatd_admin/datasets" />
        )}
      />
      <Route exact path="/dcatd_admin/datasets/:id?" component={DatasetsContainer} />
    </Container>
  </div>
);

export default App;
