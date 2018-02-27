import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Form, Header } from 'semantic-ui-react';
import DatasetForm from './DatasetForm/DatasetForm';

class DatasetDetail extends React.Component {
  constructor(props) {
    super(props);

    // NB: Setting state of nested objects, i.e. `{ dataset: { name: '' } }`, is not supported
    this.state = {
      etag: props.dataset.etag || '',
      emailAddress: props.dataset.emailAddress || '',
      name: props.dataset.name || '',
      // NB: Set all roles directly on the state
      ...(props.dataset.roles || [])
        .map(role => role.title)
        .reduce((prev, curr) => ({
          ...prev,
          [curr]: true
        }), {})
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!Object.keys(nextProps.dataset).length) {
      return;
    }

    this.setState({
      etag: nextProps.dataset.etag,
      emailAddress: nextProps.dataset.emailAddress,
      name: nextProps.dataset.name,
      // NB: Set all roles directly on the state
      ...(nextProps.dataset.roles || [])
        .map(role => role.title)
        .reduce((prev, curr) => ({
          ...prev,
          [curr]: true
        }), {})
    });
  }

  handleChange(event, result) {
    this.setState({
      // NB: `result.*` is Semantic UI's approach for cross-browser support
      [result.name]: result.value || result.checked
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const dataset = {
      etag: this.state.etag,
      emailAddress: this.state.emailAddress,
      name: this.state.name,
      // NB: Reverse mapping of roles directly to the state
      roles: this.props.roles.reduce((prev, curr) => (this.state[curr.title] ?
        prev.concat(curr) : prev), [])
    };

    if (this.props.onCreate) {
      this.props.onCreate(dataset);
    }

    if (this.props.onUpdate) {
      this.props.onUpdate(dataset);
    }
  }

  render() {
    return (
      <span>
        <DatasetForm />
        <Form onSubmit={this.handleSubmit}>
          <Header as="h2">Koppeling wijzigen</Header>
          <Form.Group widths="equal">
            <Form.Input
              label="E-mailadres"
              name="emailAddress"
              onChange={this.handleChange}
              placeholder="E-mailadres"
              value={this.state.emailAddress}
            />
          </Form.Group>
          <Form.Group inline>
            <label htmlFor="employee_plus">Rollen</label>
            {this.props.roles.map(role => (
              <Form.Checkbox
                checked={this.state[role.title]}
                key={role.href}
                label={role.title}
                name={role.title}
                onChange={this.handleChange}
              />
            ))}
          </Form.Group>
          <Form.Group inline>
            <Form.Button primary>Opslaan</Form.Button>
            {/* Use classes on a `<div>` instead of `<Button>` for Firefox support */}
            <div className="ui button">
              <NavLink
                style={{ color: '#FFF' }}
                to="/datasets"
              >
                Annuleren
              </NavLink>
            </div>
          </Form.Group>
        </Form>
      </span>
    );
  }
}

DatasetDetail.defaultProps = {
  dataset: {},
  onCreate: () => {},
  onUpdate: () => {},
  roles: []
};

DatasetDetail.propTypes = {
  dataset: PropTypes.shape({
    etag: PropTypes.string,
    emailAddress: PropTypes.string,
    name: PropTypes.string,
    roles: PropTypes.array
  }),
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.object)
};

export default DatasetDetail;
