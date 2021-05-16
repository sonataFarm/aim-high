import { Typography, withStyles } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
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

class EditableDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: moment(props.date), editing: false };
  }

  handleUpdate = e => {
    this.props.handleUpdate(e);
    this.setState({ value: e, modalOpen: false });
    this.toggleEditing();
  }

  handleModalOpen = () => { this.setState({ modalOpen: true })}
  
  toggleEditing = () => {
    const { editing } = this.state;
    if (editing) {
      this.setState({ modalOpen: false });
    }

    this.setState({ editing: !editing });
  };

  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  setWrapperRef = node => { this.wrapperRef = node; };

  handleClickOutside = e => {
    const { editing, modalOpen } = this.state;
    const clickOutside = this.wrapperRef && !this.wrapperRef.contains(e.target);

    if (editing && !modalOpen && clickOutside) {
      this.wrapperRef = null;
      this.toggleEditing();
    }
  };

  render() {
    const { TypographyProps } = this.props;
    if (!this.state.editing) {
      return (
        <Typography 
          classes={{ root: this.props.classes.body }}
          display="inline"
          component="span"
          variant="body2"
          onClick={this.toggleEditing}
          { ...TypographyProps }
        >
          {this.props.children}
        </Typography>
      );
    } else {
      return (
        <div ref={this.setWrapperRef}>
          <KeyboardDatePicker
            margin="normal"
            label="Date"
            format="MM/DD/YYYY"
            value={this.state.value}
            inputValue={this.state.value.format("MM/DD/YYYY")}
            onChange={e => this.handleUpdate(e)}
            onOpen={() => this.handleModalOpen()}
          />
        </div>
      );
    }
  } 
}

export default withStyles(styles)(EditableDate);