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
      value: props.children || '',
      editable: false
    };
  }

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.children !== this.props.children) {
      this.setState({ value: this.props.children });
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ value: e.currentTarget.value });
  };

  handleSubmit = () => {
    if (!this.state.value.match(/\S/) && !this.props.acceptBlankValue) {
      return;
    }

    this.wrapperRef = null;
    this.props.handleUpdate(this.state.value);
    this.toggleEditable();
  }
  
  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.handleSubmit();
    }
  };

  handleKeystroke = e => {
    if (e.key === 'Enter') {
      if (e.shiftKey || e.metaKey) {
        return;
      }
      this.handleSubmit();
    }
  }
  
  toggleEditable = () => {
    this.setState({ editable: !this.state.editable });
  };

  setWrapperRef = node => { this.wrapperRef = node; };

  render() {
    const { label, TypographyProps } = this.props;
    let textAsHtml = this.state.value || '';

    if (textAsHtml.includes("\n")) {
      textAsHtml = textAsHtml.split("\n").map((p, i) => <p key={i}>{p}</p>);
    }

    if (!this.state.editable) {
      return (
        <Typography 
          classes={{ root: this.props.classes.body }}
          display="inline"
          component="p"
          variant="body2"
          onClick={this.toggleEditable}
          { ...TypographyProps }
        >
          {textAsHtml}
        </Typography>
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
          multiline
          onKeyDown={e => this.handleKeystroke(e)} 
        />
      );
    }
  } 
}

export default withStyles(styles)(EditableTextField);