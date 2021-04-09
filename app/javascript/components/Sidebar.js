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

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  }
}));

const Sidebar = () => {
  const classes = useStyles();

  const data = {
    visions: {
      3: {
        id: 3,
        title: 'Veritatis Nihil Sed Quis Officia',
        goals: [5, 6, 10]
      },
      21: {
        id: 21,
        title: 'Non Ab Qui',
        goals: []
      }
    },
    goals: {
      5: {
        id: 5,
        title: 'Id Expedita'
      },
      6: {
        id: 6,
        title: 'Ipsum Libero Pariatur Provident'
      },
      10: {
        id: 10,
        title: 'Ut Nihil Reiciendis'
      }
    }
  };

  const getEntities = (name) => Object.keys(data[name]).map(k => data[name][k]);

  return (
    <div id="me" className={classes.root}>
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
          {getEntities('visions').map(v => (
            <div key={v.id}>
              <ListItem button><ListItemText primary={v.title} /></ListItem>
              <List dense disablePadding>
                {v.goals.map(id => data.goals[id]).map(goal => (
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

export default Sidebar;
