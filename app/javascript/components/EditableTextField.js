import { TextField, Typography, withStyles } from '@material-ui/core';
import React from 'react';

const styles = theme => ({
  body: {
    width: '100%',
    '&:hover': {
      cursor: 'text'
    }
  },
  resize: {
    fontSize: theme.typography.body2.fontSize,
  }
});

class EditableTextField extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      value: props.children,
      editable: false
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.children !== this.props.children) {
      this.setState({ value: this.props.children });
    }
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ value: e.currentTarget.value });
  };
  
  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.wrapperRef = null;
      this.props.handleUpdate(this.state.value);
      this.toggleEditable();
    }
  };
  
  toggleEditable = () => {
    this.setState({ editable: !this.state.editable });
  };

  setWrapperRef = node => { this.wrapperRef = node; };

  render() {
    const { label } = this.props;
    if (!this.state.editable) {
      return (
        <Typography 
          classes={{ root: this.props.classes.body }}
          display="inline"
          component="span"
          variant="body2"
          onClick={this.toggleEditable}

        >{this.state.value}</Typography>
      );
    } else {
      return (
        <TextField 
          InputProps={{
            classes: { input: this.props.classes.resize }
          }}
          ref={this.setWrapperRef}
          type="text"
          fullWidth
          label={label}
          required
          value={this.state.value}
          onChange={this.handleChange}
          multiline rows={3} 
        />
      );
    }
  } 
}

export default withStyles(styles)(EditableTextField);