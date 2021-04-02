import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiModal from '@material-ui/core/Modal';
import { Button, Divider, Typography } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
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
      <Typography variant="h4">Modal Title</Typography>
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