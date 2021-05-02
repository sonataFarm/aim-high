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
  },
  header: {
    background: theme.palette.primary.dark,
    color: 'white',
    '& svg': {
      color: 'white'
    }
  },
  listItem: {
    background: theme.palette.primary.light,
    '& span': {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1,
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
      padding: 0,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }
  },
  listCategory: {
    background: theme.palette.primary.dark,
    '& span': {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1,
      letterSpacing: "0.08333em",
      padding: 0,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      color: 'white'
    }
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
        <List className={classes.header}>
          <ListItemLink to="/goals" primary="Goals" icon={<StarHalf />} />
          <ListItemLink to="/review" primary="Review" icon={<AssignmentTurnedIn />} />
        </List>
        <Divider />
        <List disablePadding>
          {denormalize(visions).map(v => (
            <div key={v.id}>
              <ListItemLink 
                to={`/visions/${v.id}`} 
                primary={v.title} 
                className={classes.listCategory}
              />
              <List dense disablePadding>
                {v.goals.map(id => goals[id]).map(goal => (
                  <ListItemLink 
                    to={`/goals/${goal.id}`} 
                    primary={goal.title} 
                    className={classes.listItem}
                    key={goal.id} />
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
