import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline, List, Divider, CircularProgress } from '@material-ui/core';
import { AssignmentTurnedIn, StarHalf } from '@material-ui/icons';
import { denormalizeEntities } from '../util/normalize';
import ListItemLink from './ListItemLink';

const drawerWidth = 280;

const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: '1px solid black'
  },
  header: {
    background: theme.palette.primary.dark,
    color: 'white',
    '& svg': {
      color: theme.palette.secondary.main
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
});

class Sidebar extends React.Component {
  render() {
    if (this.props.loading) {
      return <CircularProgress />;
    }

    const { visions, goals } = this.props;
    return (
      <div>
        <CssBaseline />
        <Drawer
          className={this.props.classes.drawer}
          variant="permanent"
          classes={{ paper: this.props.classes.drawerPaper }}
          anchor="left"
        >
          <List className={this.props.classes.header}>
            <ListItemLink to="/goals" primary="Goals" icon={<StarHalf />} />
            <ListItemLink to="/review" primary="Review" icon={<AssignmentTurnedIn />} />
          </List>
          <Divider />
          <List disablePadding>
            {visions.map(v => (
              <div key={v.id}>
                <ListItemLink 
                  to={`/visions/${v.id}`} 
                  primary={v.title} 
                  className={this.props.classes.listCategory}
                />
                <List dense disablePadding>
                  {v.goals.map(id => goals[id]).map(goal => (
                    <ListItemLink 
                      to={`/goals/${goal.id}`} 
                      primary={goal.title} 
                      className={this.props.classes.listItem}
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
}
  
const mapStateToProps = state => ({
  visions: denormalizeEntities(state.entities.visions),
  goals: state.entities.goals,
  loading: state.ui.loading.visions || state.ui.loading.goals
});

export default connect(mapStateToProps, null)(withStyles(styles)(Sidebar));
