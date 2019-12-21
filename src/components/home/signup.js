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

import {
  signup
} from './actions';
import logo from 'src/images/logo.png';

const mapStateToProps = state => {
	return {
		isAuthenticated: state.home.isAuthenticated
	};
};

const mapDispatchToProps = dispatch => {
	return {
		signup: (data, callback) => dispatch(signup(data, callback)),
	};
};


@connect(mapStateToProps, mapDispatchToProps)
class SignUp extends React.Component {
	state = {
    email: '',
    password: '',
    confpassword: '',
    message: ''
  };

  inputEmail = (event, data) => {
    this.setState({ email: data.value });
  }

  inputPassword = (event, data) => {
    this.setState({ password: data.value });
  }

  inputConfPassword = (event, data) => {
    this.setState({ confpassword: data.value });
  }

  signup = () => {
    const { email, password, confpassword } = this.state;
    if (password === confpassword) {
      this.props.signup({ email, password }, (success, msg) => {
        if (success) {
          alert('success')
        } else {
          this.setState({ message: msg });
        }
      })
    } else {
      this.setState({ message: "Password in both field should be same!" });
    }
  }
    
  render() {
    const { email, password, confpassword, message } = this.state;

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src={logo} /> Create account
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
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Re-enter Password'
                type='password'
                onChange={this.inputConfPassword}
                value={confpassword}
              />
              {!!message.length && <Message color='red'>{message}</Message>}
              <Button color='teal' fluid size='large' onClick={this.signup}>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Already Member? <a href='#' onClick={this.props.onSignin}>Sign In</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignUp;