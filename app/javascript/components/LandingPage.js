import React, { useState } from 'react';
import { Button, Divider, Grid, makeStyles, Typography } from '@material-ui/core';

import Modal from './Modal';

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

  const [ loginModalOpen, setLoginModalOpen ] = useState(false);
  const [ signupModalOpen, setSignupModalOpen ] = useState(false);

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
              <Grid item>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  className={classes.button}
                  onClick={() => setLoginModalOpen(true)}
                >
                Log in
              </Button>
              </Grid>
              <Grid item>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large" 
                  className={classes.button}
                  onClick={() => setSignupModalOpen(true)}
                >
                  Sign Up
                </Button>
              </Grid>f
            </Grid>
            <Modal btnText="Log In" ></Modal>
          <Grid item xs={2} />
        </Grid>
      </Grid>
      <Modal 
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        title="Log In"
      >
        Log in!
      </Modal>
      <Modal
        open={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        title="Register"
      >
        Register!
      </Modal>
    </div>
  );
};

export default LandingPage;