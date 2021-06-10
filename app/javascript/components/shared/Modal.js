import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiModal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.main,
    position: 'absolute',
    width: 500,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    top: '50%',
    left: '50%',
    transform: `translate(-${50}%, -${50}%)`,
  }
}));

const Modal = ({ open, onClose, title, children }) => {
  const classes = useStyles();

  const body = (
    <div className={`${classes.paper} ${classes.modal}`}>
      <Typography variant="h4">{title}</Typography>
      {children}
    </div>
  );

  return (
    <div>
      <MuiModal
        open={open}
        onClose={onClose}
      >
        {body}
      </MuiModal>
    </div>
  );
};

export default Modal;