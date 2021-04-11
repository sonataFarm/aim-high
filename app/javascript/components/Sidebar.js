import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline, List, Divider } from '@material-ui/core';
import { AssignmentTurnedIn, StarHalf } from '@material-ui/icons';
import { denormalize } from '../util/normalize';
import ListItemLink from './ListItemLink';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  }
}));

const Sidebar = ({ goals, visions }) => {
  const classes = useStyles();
  
  return (
    <div>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <List>
          <ListItemLink to="/goals" primary="Goals" icon={<StarHalf />} />
          <ListItemLink to="/review" primary="Review" icon={<AssignmentTurnedIn />} />
        </List>
        <Divider />
        <List disablePadding>
          {denormalize(visions).map(v => (
            <div key={v.id}>
              <ListItemLink to={`/visions/${v.id}`} primary={v.title} />
              <List dense disablePadding>
                {v.goals.map(id => goals[id]).map(goal => (
                  <ListItemLink to={`/goals/${goal.id}`} primary={goal.title} key={goal.id} />
                ))}
              </List>
            </div>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

const mapStateToProps = state => ({
  goals: state.entities.goals,
  visions: state.entities.visions
});

export default connect(mapStateToProps, null)(Sidebar);
