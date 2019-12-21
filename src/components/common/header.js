import React from 'react';
import {
  Container,
  Image,
  Header,
  Menu,
} from 'semantic-ui-react';

export default class header extends React.Component {
  
  render() {
    return (
      <div>
        <Menu fixed='top' inverted>
            <Menu.Item as='a' header>
              <Image size='mini' src={'logo.png'} style={{ marginRight: '1.5em' }} />
              DiskSpace
            </Menu.Item>
            {/* <Menu.Item as='a'>Home</Menu.Item> */}
        </Menu>
      </div>
    )
  }
}