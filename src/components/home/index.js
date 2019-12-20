import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'semantic-ui-react';

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
      <div>
        <Icon name='home' size='large' />
        Welcome
      </div>
    );
  }
}

export default Home;