import React from 'react';
import { Route, Redirect } from 'react-router';
import { Container } from 'semantic-ui-react';

import Header from '../Header/Header';
import DatasetsContainer from '../../containers/DatasetsContainer/DatasetsContainer';
import Modal from '../Modal/Modal';

const App = () => {
  return (
    <div>
      <Header />
      <Container className="container-main">
        <Route
          path="/"
          render={() => (
            <Redirect to="/datasets" />
          )}
        />
        <Route exact path="/datasets/:id?" component={DatasetsContainer} />
      </Container>
      <Modal />
    </div>
  );
};

export default App;
