import React from 'react';
import { connect } from 'react-redux';

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from 'semantic-ui-react';

import firebase from '../../firebase';
import {
  login
} from './actions';

const mapStateToProps = state => {
	return {
		isAuthenticated: state.home.isAuthenticated
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: (data, callback) => dispatch(login(data, callback)),
	};
};


@connect(mapStateToProps, mapDispatchToProps)
class SignIn extends React.Component {
	state = {
    email: '',
    password: ''
  };

  inputEmail = (event, data) => {
    this.setState({ email: data.value });
  }

  inputPassword = (event, data) => {
    this.setState({ password: data.value });
  }

  login = () => {
    const { email, password } = this.state;
    this.props.login({ email, password }, (success) => {
      if (success) {
        alert('success')
      } else {
        alert('Invalid credentials')
      }
    })
  }
    
  render() {
    const { email, password } = this.state;

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/src/images/logo.png' /> Log-in to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' onChange={this.inputEmail} value={email} />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={this.inputPassword}
                value={password}
              />
    
              <Button color='teal' fluid size='large' onClick={this.login}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a href='#' onClick={this.props.onSignup}>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignIn;