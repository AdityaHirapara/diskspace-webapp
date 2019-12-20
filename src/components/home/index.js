import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		isAuthenticated: state.home.isAuthenticated
	};
};

@connect(mapStateToProps)
class Home extends React.Component {
	state = {
		role: 'candidate'
  };
    
  render() {
    return (
      <div>Welcome</div>
    );
  }
}

export default Home;