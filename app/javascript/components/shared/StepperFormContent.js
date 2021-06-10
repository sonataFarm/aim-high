import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
}) 

const StepperFormContent = (props) => {
  const classes = useStyles();

  return (
    <div id="description" className={classes.container}>
      { props.children }
    </div>
  );
}

export default StepperFormContent;