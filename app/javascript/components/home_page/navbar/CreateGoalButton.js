import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const CreateGoalButton = (props) => {
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  const handleMenuClick = e => { setAnchorEl(e.currentTarget); };
  const handleClose = () => { setAnchorEl(null) };

  const handleAddGoal = () => { 
    setAnchorEl(null);
    props.history.push('/goals/new');
  };
  
  const handleAddVision = () => { 
    setAnchorEl(null);
    props.history.push('/visions/new');
   };

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
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        { props.userHasVisions ? (
          <MenuItem onClick={handleAddGoal}>Create Goal</MenuItem> 
        ) : ( 
          null 
        )}
        <MenuItem onClick={handleAddVision}>Create Vision</MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = state => ({
  userHasVisions: Object.keys(state.entities.visions).length
});

export default withRouter(connect(mapStateToProps)(CreateGoalButton));