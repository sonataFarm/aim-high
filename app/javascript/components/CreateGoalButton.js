import React from 'react';
import { withRouter } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const CreateGoalButton = (props) => {
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  const handleMenuClick = e => { setAnchorEl(e.currentTarget); };
  const handleClose = () => { setAnchorEl(null) };

  const handleAddGoal = () => { 
    setAnchorEl(null);
    props.history.push('/goals/new') 
  };
  const handleAddSupergoal = () => { console.log('hi') };

  return (
    <div>
      <IconButton
            color="secondary"
            onClick={handleMenuClick}
          >
        <AddCircle />
      </IconButton>
      <Menu
        id="menu-add-goal"
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        // keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAddGoal}>Add Goal</MenuItem>
        <MenuItem onClick={handleAddSupergoal}>Add Supergoal</MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(CreateGoalButton);