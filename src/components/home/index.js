import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'semantic-ui-react';

import Header from '../common/header';
import SignIn from './signin';
import SignUp from './signup';

const mapStateToProps = state => {
	return {
		isAuthenticated: state.home.isAuthenticated
	};
};

@connect(mapStateToProps)
class Home extends React.Component {
	state = {
		signin: true
  };

  toggleSignin = () => {
    const { signin } = this.state;
    this.setState({ signin: !signin });
  }
    
  render() {
    const { signin } = this.state;
    return (
      <div>
        <Header />
        {signin? 
          <SignIn onSignup={this.toggleSignin} />:
          <SignUp onSignin={this.toggleSignin}/>
        }
      </div>
    );
  }
}

export default Home;