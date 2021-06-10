import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { logOut } from '../../../actions/session-actions';

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.grey[300]
  }
}));

const AccountButton = (props) => {
  const classes = useStyles();

  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const handleMenuClick = e => { setAnchorEl(e.currentTarget); };
  const handleClose = () => { setAnchorEl(null) };

  const handleLogOut = () => { 
    setAnchorEl(null);
    props.dispatch(logOut());
  };

  return (
    <div>
      <IconButton
        className={classes.icon}
        color="primary"
        onClick={handleMenuClick}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-account"
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(connect()(AccountButton));