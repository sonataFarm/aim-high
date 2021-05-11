import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux';
import { fetchAllGoals } from '../actions/goal-actions';
import { fetchAllVisions } from '../actions/vision-actions';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Navbar from './Navbar';

const navbarHeight = 50;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  contentArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
  },
  navbar: {
    height: `${navbarHeight}px`,
  },
  mainContent: {
    height: `calc(100vh - ${navbarHeight}px)`
  }
};

class HomePage extends React.Component {
  componentDidMount() {
    this.props.fetchAllGoals();
    this.props.fetchAllVisions();
  }
  
  render() {
    return (
      <div className={ this.props.classes.container }>
        <Sidebar />
        <div className={ this.props.classes.contentArea }>
          <div className={ this.props.classes.navbar }>
            <Navbar />
          </div>
          <div className={ this.props.classes.mainContent }>
            <MainContent />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllGoals: () => dispatch(fetchAllGoals()),
  fetchAllVisions: () => dispatch(fetchAllVisions())
});

export default connect(
  null, mapDispatchToProps
)(withStyles(styles)(HomePage));