import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

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

    if (this.props.isAuthenticated) {
      return <Redirect to={'/dashboard'}/>
    }

    return (
      <div>
        <Header />
        {signin? 
          <SignIn onSignup={this.toggleSignin} history={this.props.history}/>:
          <SignUp onSignin={this.toggleSignin} history={this.props.history}/>
        }
      </div>
    );
  }
}

export default Home;