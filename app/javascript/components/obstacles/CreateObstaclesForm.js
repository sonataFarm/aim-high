import React from 'react';
import { Card, CardContent, Typography, IconButton, TextField, Button } from '@material-ui/core';
import { Add, RemoveCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    width: '95%',
    margin: '10px'
  },
  container: {
    width: '80%',
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const CreateObstaclesForm = (props) => {
  const { 
    obstacles, onAddObstacle, onRemoveObstacle, onObstacleChange 
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ width: '100%' }}>
        { obstacles.map((o, idx) => (
          <Card key={idx} variant="outlined" className={classes.card}>
            <CardContent>
              <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <Typography variant="h6" align="center" gutterBottom>Obstacle</Typography>
                <IconButton onClick={e => onRemoveObstacle(e, idx)}>
                  <RemoveCircle color="error" />
                </IconButton>
              </div>
              <TextField 
                width=""
                type="text"
                variant="outlined"
                label="Obstacle"
                required
                value={obstacles[idx].description}
                multiline rows={2}
                fullWidth
                onChange={e => onObstacleChange(e, 'description', idx)}
              />  
              <TextField 
                type="text"
                variant="outlined"
                label="Solution"
                required
                value={obstacles[idx].solution}
                fullWidth
                multiline rows={2}
                onChange={e => onObstacleChange(e, "solution", idx)}
              />  
            </CardContent>
          </Card>
        )) }
      </div>
      <Button 
        color="primary" 
        variant="contained"
        onClick={(e) => onAddObstacle(e)}
        style={{ marginBottom: '10px' }}
        startIcon={<Add />}
      >
        Add Another Obstacle
      </Button> 
    </div>
  );
};

export default CreateObstaclesForm;