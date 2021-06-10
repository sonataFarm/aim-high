import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { updateReview, deleteReview } from '../../actions/review-actions';
import { EditableTextField, DeleteButton } from '../shared';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  description: {
    paddingTop: '6px',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ReviewCard = ({ review, dispatch }) => {
  const classes = useStyles();

  const handleUpdate = body => {
    dispatch(updateReview({ id: review.id, body }))
  }

  const handleDelete = () => {
    dispatch(deleteReview(review.id));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.header}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          { moment(review.created_at).format('dddd MMMM Do, YYYY') }
        </Typography>
        <DeleteButton 
          btnProps
          confirmMsg="Are you sure you want to delete this review?"
          handleDelete={handleDelete}
          icon={<Clear color="disabled" />}
        />
        </div>
          <div className={classes.description}>
            <EditableTextField 
              label="Review"
              handleUpdate={handleUpdate}
            >
              { review.body }
            </EditableTextField>              
          </div>
      </CardContent>
    </Card>
  );
};

export default withRouter(connect()(ReviewCard));