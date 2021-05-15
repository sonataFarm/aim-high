import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditableTextField from './EditableTextField';
import { updateReview, deleteReview } from '../actions/review-actions';
import DeleteButton from './DeleteButton';
import { Clear } from '@material-ui/icons';

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
    display: '-webkit-box',
    lineClamp: 4,
    boxOrient: 'vertical',
    height: '100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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