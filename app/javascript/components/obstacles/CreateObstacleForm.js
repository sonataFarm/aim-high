import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, IconButton, makeStyles, TextField } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { createObstacle } from '../../actions/obstacle-actions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '& > *': {
      margin: theme.spacing(0.5),
    }
  },
}));

const CreateObstacleForm = (props) => {
  const classes = useStyles();
  const blankForm = { description: '', solution: '' };
  
  const [ open, setOpen ] = useState(false);
  const [ formData, setFormData ] = useState(blankForm);

  const handleChange = field => e => {
    e.preventDefault();
    setFormData({ ...formData, [field]: e.currentTarget.value });
  };

  const handleSubmit = () => {
    const goalId = props.match.params.id;
    const obstacle = { goalId, ...formData };
    props.dispatch(createObstacle(obstacle));
    setFormData(blankForm);
    setOpen(false);
  }

  return (
    <div className={classes.container}>
      {!open ? (
        <IconButton
          color="primary"
          size="medium"
          onClick={() => setOpen(true)}
        >
        <AddCircle />
      </IconButton>
      ) : (
        <React.Fragment>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Description"
            required
            value={formData.description}
            onChange={handleChange('description')}
            multiline rows={5} 
          />
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Solution"
            required
            value={formData.solution}
            onChange={handleChange('solution')}
            multiline rows={5} 
          />
          <Button 
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Create Obstacle
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

export default withRouter(connect()(CreateObstacleForm));