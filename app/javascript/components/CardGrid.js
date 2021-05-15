import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  cardGridContainer: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5)
  }
}));

const CardGrid = ({ cards, breakpoints }) => {
  const classes = useStyles();

  return (
    <div className={classes.cardGridContainer}>
      <Grid container spacing={3}>
        {cards.map((card, idx) => (
          <Grid key={idx} item xs={12} sm={6} md={4} {...breakpoints}>
            {card}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CardGrid;