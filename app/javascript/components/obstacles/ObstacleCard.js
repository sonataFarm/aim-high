import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, CardContent, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Clear } from '@material-ui/icons';
import { updateObstacle, deleteObstacle } from '../../actions/obstacle-actions';
import { EditableTextField, DeleteButton } from '../shared';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    '& hr': {
      marginBottom: 15
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textField: {
    boxOrient: 'vertical',
    paddingTop: '6px',
    margin: '10px'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ObstacleCard = ({ obstacle, dispatch }) => {
  const classes = useStyles();

  const handleUpdate = field => value => {
    dispatch(updateObstacle({ id: obstacle.id, [field]: value }));
  }

  const handleDelete = () => {
    dispatch(deleteObstacle(obstacle.id));
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.header}>
          <DeleteButton 
            btnProps
            confirmMsg="Are you sure you want to delete this obstacle?"
            handleDelete={handleDelete}
            icon={<Clear color="disabled" />}
          />
        </div>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Obstacle
        </Typography>
        <div className={classes.textField}>
          <EditableTextField 
            label="Obstacle"
            handleUpdate={handleUpdate('description')}
          >
            { obstacle.description }
          </EditableTextField>              
        </div>
        <Divider />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Solution
        </Typography>
        <div className={classes.textField}>
          <EditableTextField 
            label="Solution"
            handleUpdate={handleUpdate('solution')}
          >
            { obstacle.solution }
          </EditableTextField>              
        </div>

      </CardContent>
    </Card>
  );
};

export default withRouter(connect()(ObstacleCard));