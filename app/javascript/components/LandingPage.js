import React, { useState } from 'react';
import { Button, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import Modal from './Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    width: '100vw',
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
  const tema = useTheme();
  console.log(tema);
  const classes = useStyles();

  const [ loginModalOpen, setLoginModalOpen ] = useState(false);
  const [ signupModalOpen, setSignupModalOpen ] = useState(false);
  const [ guestDemoModalOpen, setGuestDemoModalOpen ] = useState(false);

  return (
    <div id="landing-page-container" className={classes.container}>
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
            <Typography variant="subtitle1" align="center" style={{ position: 'relative', left: -150 }}>Who do you want to be?</Typography>
            <Typography variant="subtitle1" align="center" style={{ position: 'relative', left: 150 }}>How will you make it happen?</Typography>
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
                  color="primary" 
                  size="large" 
                  className={classes.button}
                  onClick={() => setSignupModalOpen(true)}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid container justify="center">
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large" 
                  className={classes.button}
                  onClick={() => setGuestDemoModalOpen(true)}
                >
                  Guest Demo
                </Button>
              </Grid>
            </Grid>
          <Grid item xs={2} />
        </Grid>
      </Grid>
      <Modal 
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        title="Log In"
      >
        <LoginForm />
      </Modal>
      <Modal
        open={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        title="Register"
      >
        <RegisterForm />
      </Modal>
      <Modal
        open={guestDemoModalOpen}
        onClose={() => setGuestDemoModalOpen(false)}
        title="Guest Demo"
      >
        <LoginForm 
          prefilledCredentials={{ username: 'aim_high_demo', password: '12345678'}}
        />
      </Modal>
    </div>
  );
};

export default LandingPage;