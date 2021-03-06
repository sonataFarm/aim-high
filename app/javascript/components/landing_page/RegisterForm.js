import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField, Typography, withStyles } from '@material-ui/core';
import { register } from '../../actions/session-actions';

const styles = theme => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      display: 'block'
    },
    '& > button': {
      marginTop: '10px'
    }
  },
  inputLabel: {
    color: theme.palette.grey['300']
  },
  input: {
    color: 'white'
  }
});

class RegisterForm extends React.Component {
  handleInputChange = (inputName, e) => {
    this.setState(
      { formData: { ...this.state.formData, [inputName]: e.currentTarget.value } }
    );
  };

  handleSubmit = () => {
    if (!this.validateInputs()) return;

    const { username, email, password } = this.state.formData;
    this.props.register({ username, email, password });
  };

  validateInputs = () => {
    const { 
      username, email, password, passwordConfirmation 
    } = this.state.formData;

    const errors = [];
    if (!username) errors.push("Username must not be blank");
    if (!email) errors.push("Email must not be blank");
    if (!password) errors.push("Password must not be blank");
    if (!(password === passwordConfirmation)) errors.push("Password and password confirmation must be a match.");

    if (errors.length) {
      this.setState({ errors });
      return false;
    }
    
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      errors: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const errMsgs = this.state.errors.map((err, idx) => (<Typography key={idx} color="error">{err}</Typography>));
    
    const { classes } = this.props;
    const { formData } = this.state;

    return (
      <React.Fragment>
        {errMsgs}
        <form className={classes.formContainer}>
          <TextField
            InputLabelProps={{ className: classes.inputLabel }}
            InputProps={{ className: classes.input }}
            id="username"
            type="text"
            label="Username"
            margin="dense"
            required
            value={formData.username}
            onChange={e => this.handleInputChange('username', e)}
          />
          <TextField
            InputLabelProps={{ className: classes.inputLabel }}
            InputProps={{ className: classes.input }}
            id="email"
            type="text"
            label="Email"
            margin="dense"
            required
            value={formData.email}
            onChange={e => this.handleInputChange('email', e)}
          />
          <TextField
            InputLabelProps={{ className: classes.inputLabel }}
            InputProps={{ className: classes.input }}
            id="password"
            type="password"
            label="Password"
            margin="dense"
            required
            value={formData.password}
            onChange={e => this.handleInputChange('password', e)}
          />
          <TextField
            InputLabelProps={{ className: classes.inputLabel }}
            InputProps={{ className: classes.input }}
            id="password-confirmation"
            type="password"
            label="Confirm Password"
            margin="dense"
            required
            value={formData.passwordConfirmation}
            onChange={e => this.handleInputChange('passwordConfirmation', e)}
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
  register: user => dispatch(register(user))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(RegisterForm));