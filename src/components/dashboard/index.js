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
import firebase from '../../firebase';
import axios from 'axios';
import MediaQuery from 'react-responsive';

import NavBar from '../common/header';
import {
  uploadImage
} from './actions';
import {
  logout
} from '../home/actions';
import styles from './dashboard.module.css';

const mapStateToProps = state => {
	return {
    isAuthenticated: state.home.isAuthenticated,
    profile: state.home.details.profile,
	};
};

const mapDispatchToProps = dispatch => {
	return {
    uploadImage: (email, image, callback) => dispatch(uploadImage(email, image, callback)),
    logout: (callback) => dispatch(logout(callback)),
	};
};

@connect(mapStateToProps, mapDispatchToProps)
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.aref = React.createRef();
  }

	state = {
    open: false,
    acceptedFiles: [],
    images: [],
    zoom:false,
    image: '',
    uploading: false,
    downloading: false
  };

  componentDidMount() {
    const { email } = this.props.profile;
    const { images } = this.state;
    var ref = firebase.database().ref("All_Image_Uploads_Database");
    ref.orderByChild("imageName").equalTo(email).on("child_added", (snapshot) => {
      images.push({...snapshot.val(), key: snapshot.key});
      this.setState({ images });
    });
  }

  show = () => {
    this.setState({ open: true });
  }

  close = () => {
    this.setState({ open: false });
  }

  dropFile = acceptedFiles => {
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

  updateImages = (status) => {
    if (status) {
      this.close();
    } else {
      alert("Sorry for trouble! We are trying to improve :)");
    }
    this.setState({ uploading: false, acceptedFiles: [] });
  }

  submitImage = () => {
    if (this.state.acceptedFiles.length) {
      const { profile, uploadImage } = this.props;
      const file = this.state.acceptedFiles[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let img = reader.result.split(',')[1];
        this.setState({ uploading: true });
        uploadImage(profile.email, img, this.updateImages);
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }

  zoomIn = (image) => {
    this.setState({ zoom: true, image });
  }

  zoomOut = () => {
    this.setState({ zoom: false, image: {} });
  }

  downloadImage = () => {
    this.setState({ downloading: true });
    axios
      .post('http://14c4f188.ngrok.io/js', { "key1": this.state.image.imageURL })
      .then(res => {
        const blob = this.b64toBlob(res.data, 'image/png')
        this.setState({extracted: URL.createObjectURL(blob)});
        console.log(blob)
        this.aref.current.click();
        this.zoomOut();
        this.setState({ downloading: false });
      })
      .catch(e => {
        console.log(e);
        this.setState({ downloading: false });
        alert('Sorry for trouble! We are trying to improve :)');
      })
  }

  downloadCompressedImage = () => {
    const blob = this.b64toBlob(this.state.image.imageURL, 'image/png')
    console.log(blob)
    this.setState({extracted: URL.createObjectURL(blob)}, () => {
      this.aref.current.click();
    });
    
    // this.zoomOut();
  }

  b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  deleteImage = () => {
    const { image, images } = this.state;
    firebase.database().ref("All_Image_Uploads_Database/" + image.key).remove()
      .then(() => {
        let i = images.findIndex(i => i.key === image.key);
        images.splice(i, 1);
        this.setState({images});
        this.zoomOut();
      })
      .catch(e => {
        console.log(e);
      })
  }

  logout = () => {
    this.props.logout(() => {
      this.props.history.push('/');
    })
  }

  render() {
    const { profile } = this.props;
    const { open, acceptedFiles, images, zoom, image, uploading, downloading } = this.state;

    const storage = images.reduce((acc, curr) => acc + curr.size, 0);
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
              style={{position: 'relative', display: 'inline-table', width: '13%', zIndex: 0}}
            >
              <Menu.Item as='a' active>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item as='a' onClick={this.show}>
                <Icon name='upload' />
                Upload
              </Menu.Item>
              <Menu.Item as='a' onClick={this.logout}>
                <Icon name='sign-out' />
                Logout
              </Menu.Item>

              <Menu.Item style={{position: 'absolute', bottom: 0, width: '100%'}}>
                <Icon color="teal" name='database'/>
                <div style={{marginTop: 15, fontSize: 16}}>{(storage/1000).toFixed(2)}MB Used</div>
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={false} style={{width: '87%'}}>
              <Segment basic>
                <MediaQuery query="(min-width: 950px)">
                  <Grid relaxed columns={5}>
                    {!!images.length && 
                      images.map(i =>
                        <Grid.Column>
                          <Image src={`data:image/png;base64,${i.imageURL}`} onClick={() => this.zoomIn(i)}/>
                        </Grid.Column>
                      )
                    }
                  </Grid>
                </MediaQuery>
                <MediaQuery query="(min-width: 786px) and ( max-width: 949px)">
                  <Grid relaxed columns={4}>
                    {!!images.length && 
                      images.map(i =>
                        <Grid.Column>
                          <Image src={`data:image/png;base64,${i.imageURL}`} onClick={() => this.zoomIn(i)}/>
                        </Grid.Column>
                      )
                    }
                  </Grid>
                </MediaQuery>
                <MediaQuery query="(max-width: 785px)">
                  <Grid relaxed columns={2}>
                    {!!images.length && 
                      images.map(i =>
                        <Grid.Column>
                          <Image src={`data:image/png;base64,${i.imageURL}`} onClick={() => this.zoomIn(i)}/>
                        </Grid.Column>
                      )
                    }
                  </Grid>
                </MediaQuery>
              </Segment>
              <a ref={this.aref} href={this.state.extracted} style={{display: 'none'}} download> </a>
              <Modal size={'large'} closeIcon={<Icon name="close" style={{color: '#fff', top: '-10px'}}/>} open={zoom} onClose={this.zoomOut} style={{background: 'transparent', boxShadow: 'none'}}>
                <Modal.Content style={{background: 'transparent'}}>
                  <div className={styles.preview}>
                    <Image src={`data:image/png;base64,${image.imageURL}`} style={{maxWidth: '100%', maxHeight: '70vh'}}/>
                  </div>
                </Modal.Content>
                <Modal.Actions style={{background: 'transparent'}}>
                  <Button
                    negative
                    icon='trash'
                    labelPosition='right'
                    content='Delete'
                    onClick={this.deleteImage}
                  />
                  <Button
                    loading={downloading}
                    positive
                    icon='download'
                    labelPosition='right'
                    content='Download'
                    onClick={this.downloadImage}
                  />
                  <Button
                    positive
                    icon='download'
                    labelPosition='right'
                    content='Compressed'
                    onClick={this.downloadCompressedImage}
                  />
                </Modal.Actions>
              </Modal>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
          <Modal size={'small'} open={open} onClose={this.close}>
            <Modal.Header>Upload Image</Modal.Header>
            <Modal.Content>
              {/* <p>Are you sure you want to delete your account</p> */}
              
              {!acceptedFiles.length ?
                <Dropzone  accept={['image/jpeg', 'image/jpg', 'image/png']} onDrop={this.dropFile}>
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
                loading={uploading}
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