import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'

const mapStateToProps = state => {
  return {
    isAuthenticated: state.home.isAuthenticated,
    user: state.home.details.profile,
  }
}
@connect(
  mapStateToProps,
  null
)
class ProtectedRoute extends React.Component {
  render() {
    const {
      user,
      isAuthenticated,
      history,
      component: C,
      props: cProps,
      ...rest
    } = this.props
    if (isAuthenticated === 'checking') {
      return (
        <Dimmer style={{ height: '100vh' }} active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      )
    }

    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ?
            (
              <C {...props} {...cProps} />
            ): (
            <Redirect to={'/'} />
          )
        }
      />
    )
  }
}

export default ProtectedRoute;