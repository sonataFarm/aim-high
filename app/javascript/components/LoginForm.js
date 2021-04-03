import React from 'react';
import { Button, Divider, TextField, Typography, withStyles } from '@material-ui/core';

import { connect } from 'react-redux';
import { logIn } from '../actions/session-actions';

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textField: {
    display: 'block',
  }
};

class LoginForm extends React.Component {
  handleSubmit = () => {
    let errors = [];
    if (!this.state.username) errors = [ ...errors, "Username must not be blank." ];
    if (!this.state.password) errors = [ ...errors, "Password must not be blank." ];

    if (errors.length) {
      this.setState({ errors });
      return;
    }

    this.props.logIn({ username: this.state.username, password: this.state.password });
  }

  handleUsernameChange = e => {
    this.setState({ username: e.currentTarget.value });
  }

  handlePasswordChange = e => {
    this.setState({ password: e.currentTarget.value });
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const errMsgs = this.state.errors.map((err, idx) => (<Typography key={idx} color="error">{err}</Typography>))
    return (
      <React.Fragment>
        {errMsgs}
        <form className={this.props.classes.formContainer}>
          <TextField 
            id="username" 
            type="text"
            label="Username" 
            margin="dense"
            required
            value={this.state.username}
            onChange={(e) => this.handleUsernameChange(e)}
            className={this.props.classes.textField}
          />
          <TextField
            id="password"
            className={this.props.classes.textField}
            type="password"
            label="Password"
            margin="dense"
            required
            value={this.state.password}
            onChange={(e) => this.handlePasswordChange(e)}
          />
          <br />
          <Button 
            className={this.props.classes.submitBtn}
            color="primary" 
            variant="outlined" 
            onClick={() => this.handleSubmit()}
          >
            Submit
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.session.errors
});

const mapDispatchToProps = dispatch => ({
  logIn: (user) => dispatch(logIn(user))
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);