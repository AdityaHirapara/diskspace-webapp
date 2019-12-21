import React from 'react';
import { connect } from 'react-redux';

import {
  Icon,
  Sidebar,
  Menu,
  Segment,
  Image,
  Header,
  Grid,
  Modal,
  Button
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import fixRotation from 'fix-image-rotation';

import NavBar from '../common/header';
import {
  loadImages,
  uploadImage
} from './actions';

import styles from './dashboard.module.css';

const mapStateToProps = state => {
	return {
    isAuthenticated: state.home.isAuthenticated,
    profile: state.home.details.profile,
    images: state.dashboard.images
	};
};

const mapDispatchToProps = dispatch => {
	return {
    loadImages: (email) => dispatch(loadImages(email)),
    uploadImage: (email, image) => dispatch(uploadImage(email, image))
	};
};

@connect(mapStateToProps, mapDispatchToProps)
class Dashboard extends React.Component {
	state = {
    open: false,
    acceptedFiles: []
  };

  componentDidMount() {
    this.props.loadImages(this.props.profile.email)
  }

  show = () => {
    this.setState({ open: true });
  }

  close = () => {
    this.setState({ open: false });
  }

  dropFile = acceptedFiles => {
    console.log(acceptedFiles)
    fixRotation.fixRotation(acceptedFiles)
			.then((arr) => {
				this.setState({
					acceptedFiles: arr,
				})
			})
			.catch(e => 
				this.setState({
					acceptedFiles
				})
			)
  }

  resetFile = acceptedFiles => {
    this.setState({acceptedFiles: []});
  }

  submitImage = () => {
    const { profile, uploadImage } = this.props;
    const file = this.state.acceptedFiles[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result)
      let img = reader.result.split(',')[1];
      uploadImage(profile.email, img);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render() {
    const { profile, images } = this.props;
    const { open, acceptedFiles } = this.state;

    return (
      <div>
        <NavBar />
        <div style={{position: 'relative',top: '9.5vh', marginLeft: -3, height: '90.5vh'}}>
          <Sidebar.Pushable as={Segment} style={{display: 'flex'}}>
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              // onHide={() => setVisible(false)}
              vertical
              visible={true}
              width='thin'
              style={{position: 'relative', display: 'inline-table', width: '13%'}}
            >
              <Menu.Item as='a' active>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item as='a' onClick={this.show}>
                <Icon name='upload' />
                Upload
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={false} style={{width: '87%'}}>
              <Segment basic>
                {/* <Header as='h3'>Application Content</Header> */}
                <Grid relaxed columns={4}>
                  {!!images.length && 
                    images.map(i =>
                      <Grid.Column>
                        <Image src={`data:image/jpeg;base64,${i.imageURL}`} onClick={() => this.zoomIn(i.imageURL)}/>
                      </Grid.Column>
                    )
                  }
                </Grid>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          <Modal size={'small'} open={open} onClose={this.close}>
            <Modal.Header>Upload Image</Modal.Header>
            <Modal.Content>
              {/* <p>Are you sure you want to delete your account</p> */}
              
              {!acceptedFiles.length ?
                <Dropzone  accept={['image/jpeg', 'image/jpg']} onDrop={this.dropFile}>
                {({getRootProps, getInputProps}) => (
                  <section>
                    <div {...getRootProps()} className={styles.dropzone}>
                      <input {...getInputProps()}/>
                      <p>Drag 'n' drop image here, or click to select image</p>
                    </div>
                  </section>
                )}
              </Dropzone>:
              acceptedFiles.map(file => (
                <div key={file.path} className={styles.preview}>
                  <Image size={"medium"} src={URL.createObjectURL(file)}/>
                  <Icon name="close" size={"big"} className={styles.close} onClick={this.resetFile}/>
                </div>
              ))}
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={() => {this.resetFile(); this.close()}}>Cancel</Button>
              <Button
                positive
                icon='plus'
                labelPosition='right'
                content='Upload'
                onClick={this.submitImage}
              />
            </Modal.Actions>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Dashboard;