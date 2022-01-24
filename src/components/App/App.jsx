import React from 'react';
import { Route, Redirect } from 'react-router';
import { Container } from 'semantic-ui-react';

import Header from '../Header/Header';
import DatasetsContainer from '../../containers/DatasetsContainer/DatasetsContainer';
import Modal from '../Modal/Modal';
import { isAuthenticated } from '../../services/auth/auth';

const App = () => {
  return (
    <div>
      <Header />
      <Container className="container-main">
        <Route
          exact
          path="/"
          render={() => {
            if (isAuthenticated()) {
              return <Redirect to="/datasets" />;
            }

            return null;
          }}
        />
        <Route exact path="/datasets/:id?" component={DatasetsContainer} />
      </Container>
      <Modal />
    </div>
  );
};

export default App;
