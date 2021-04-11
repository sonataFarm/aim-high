import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AssignmentTurnedIn, StarHalf } from '@material-ui/icons';
import { connect } from 'react-redux';
import { denormalize } from '../util/normalize';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline',
  },
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
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {['Goals', 'Review'].map((text, idx) => (
            <ListItem button key={text}>
              <ListItemIcon >{idx == 0 ? <StarHalf /> : <AssignmentTurnedIn />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List disablePadding>
          {denormalize(visions).map(v => (
            <div key={v.id}>
              <ListItem button><ListItemText primary={v.title} /></ListItem>
              <List dense disablePadding>
                {v.goals.map(id => goals[id]).map(goal => (
                  <ListItem button key={goal.id}>
                    <ListItemText primary={goal.title} />
                  </ListItem>
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
