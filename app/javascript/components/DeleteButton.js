import { Button, IconButton, makeStyles, Typography } from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
import React, { useState } from 'react';
import Modal from './Modal';

const useStyles = makeStyles(theme => ({
  btnIcon: {
    '& svg': {
      '&:hover': {
        color: theme.palette.error.main
      }
    }
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& *': {
      margin: theme.spacing(1)
    },
    '& button': {
      background: theme.palette.error.main,
      color: 'white',
      '&:hover': {
        background: theme.palette.error.dark
      }
    }
  }
}));

const DeleteButton = ({ confirmMsg, handleDelete }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleDelete();
    setOpen(false);
  }
  
  return (
    <div>
      <div onClick={handleClick}>
        <div className={classes.btnIcon}>
          <IconButton>
            <HighlightOff color="disabled" />
          </IconButton>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} title="Delete" >
        <div className={classes.modalContent}>
          <Typography color="">
            { confirmMsg }
          </Typography>
          <Button color="error" variant="contained" onClick={handleSubmit}>Delete</Button>
        </div>
      </Modal>
      
    </div>

  );
}

export default DeleteButton;