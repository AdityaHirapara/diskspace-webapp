import React from 'react';
import {
  Container,
  Image,
  Header,
  Menu,
} from 'semantic-ui-react';

import logo from 'src/images/logo.png';

export default class header extends React.Component {
  
  render() {
    return (
      <div>
        <Menu fixed='top' inverted style={{height: '10vh'}}>
            <Menu.Item as='a' header>
              <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
              <span style={{fontSize: 22, letterSpacing: 0.5}}>DiskSpace</span>
            </Menu.Item>
            {/* <Menu.Item as='a'>Home</Menu.Item> */}
        </Menu>
      </div>
    )
  }
}