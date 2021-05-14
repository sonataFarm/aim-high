import React from 'react';
import { Grid } from '@material-ui/core';

const CardGrid = ({ cards }) => {
  return (
    <Grid container spacing={3}>
      {cards.map((card, idx) => (
        <Grid key={idx} item xs={12} sm={6} md={4}>
          {card}
        </Grid>
      ))}
    </Grid>
  );
}

export default CardGrid;