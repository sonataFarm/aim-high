import { Button, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    width: '100vw',
    background: 'url(assets/stars.jpg) no-repeat center center fixed',
    'webkit-background-size': 'cover',
    'moz-background-size': 'cover',
    '-o-background-size': 'cover',
    'background-size': 'cover',
     position: 'fixed',
     top: 0,
     left: 0
  },
  white: {
    color: 'white'
  },
  button: {
    width: '200px'
  },
  mainBtnContainer: {
    'padding-top': '20px'
  }
});

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={false} md={2} />
        <Grid 
          // style={{ border: '1px solid red', height: '100%' }}
          container
          item 
          xs={10} 
          md={8} 
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <div className={classes.white}>
            <Typography variant="h5" align="center" style={{ position: 'relative', left: -150 }}>Who do you want to be?</Typography>
            <Typography variant="h5" align="center" style={{ position: 'relative', left: 150 }}>How will you make it happen?</Typography>
            <Typography variant="h1" align="center">Aim For the Stars.</Typography>
          </div>
            <Grid item container justify="center" spacing={8} className={classes.mainBtnContainer}>
              <Grid item><Button variant="contained" color="primary" size="large" className={classes.button}>Log in</Button></Grid>
              <Grid item><Button variant="contained" color="secondary" size="large" className={classes.button}>Sign Up</Button></Grid>f
            </Grid>
          <Grid item xs={2} />
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;