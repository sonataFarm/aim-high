import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { createReview } from '../../actions/review-actions';

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

const CreateReviewForm = (props) => {
  const classes = useStyles();
  
  const [ open, setOpen ] = useState(false);
  const [ body, setBody ] = useState('');

  const handleChange = e => {
    e.preventDefault();
    setBody(e.currentTarget.value);
  };

  const handleSubmit = () => {
    const review = { goalId: props.goal.id, body };
    props.dispatch(createReview(review));
  }

  return (
    <div className={classes.container}>
      {!open ? (
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={() => setOpen(true)}
        >
          Log Review
        </Button>
      ) : (
        <React.Fragment>
          <TextField 
            type="text"
            variant="outlined"
            fullWidth
            label="Review"
            required
            value={body}
            onChange={handleChange}
            multiline rows={5} 
          />
          <Button 
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Log Review
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

export default connect()(CreateReviewForm);