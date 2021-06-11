import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import CreateGoalButton from './CreateGoalButton';
import AccountButton from './AccountButton';

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: 100,
    background: theme.palette.primary.main,
    height: 'inherit',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    color: 'white',
    position: 'fixed',
    top: 0,
    left: '280px',
    right: 0,
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}));

const Navbar = ({ username }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.container}>
      <div>
        <Typography variant="body2">
          Welcome back, { username }!
        </Typography>

      </div>
      <div className={classes.menu}>
        <CreateGoalButton />
        <AccountButton />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.session.currentUser.username
});

export default connect(mapStateToProps, null)(Navbar);