import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField, Typography, withStyles } from '@material-ui/core';
import { logIn } from '../../actions/session-actions';

const styles = theme => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > button': {
      marginTop: '10px'
    },
    '& > *': {
      display: 'block'
    }
  },
  inputLabel: {
    color: theme.palette.grey['300']
  },
  input: {
    color: 'white'
  }
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    const { prefilledCredentials } = props;
    const username = prefilledCredentials ? prefilledCredentials.username : '';
    const password = prefilledCredentials ? prefilledCredentials.password : '';

    this.state = { formData: { username, password }, errors: [] };
  }
  
  handleInputChange = (inputName, e) => {
    this.setState({ formData: 
      { ...this.state.formData, [inputName]: e.currentTarget.value } 
    });
  }

  handleSubmit = () => {
    if (!this.validateInputs()) return;
    
    const { username, password } = this.state.formData;
    this.props.logIn({ username, password });
  }

  validateInputs = () => {
    const { username, password } = this.state.formData;
    const errors = [];
    if (!username) errors.push("Username must not be blank.");
    if (!password) errors.push("Password must not be blank.");

    if (errors.length) {
      this.setState({ errors });
      return false;
    }

    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const errMsgs = this.state.errors.map((err, idx) => (<Typography key={idx} color="error">{err}</Typography>))
    const { formData } = this.state;
    return (
      <React.Fragment>
        {errMsgs}
        <form className={this.props.classes.formContainer}>
          <TextField 
            InputProps={{ className: this.props.classes.input }}
            InputLabelProps={{ className: this.props.classes.inputLabel }}
            color="secondary"
            id="username" 
            type="text"
            label="Username" 
            margin="dense"
            required
            value={formData.username}
            onChange={e => this.handleInputChange('username', e)}
          />
          <TextField
            InputProps={{ className: this.props.classes.input }}
            InputLabelProps={{ className: this.props.classes.inputLabel }}
            id="password"
            type="password"
            label="Password"
            margin="dense"
            required
            value={formData.password}
            onChange={e => this.handleInputChange('password', e)}
          />
          <Button 
            color="secondary" 
            variant="outlined" 
            onClick={this.handleSubmit}
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
  logIn: user => dispatch(logIn(user))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(LoginForm));