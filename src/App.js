import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import React from 'react';

import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';

// const res= {};



const partOpts = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    }
  }
}

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: new Date()
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }



  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    // console.log("clicked!");
    this.setState({ imageURL: this.state.input });
    fetch('https://glacial-falls-60378.herokuapp.com/imageurl', {
        method : 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          console.log("into res "+ this.state.user.id);
          fetch('https://glacial-falls-60378.herokuapp.com/image', {
            method : 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
           .then(response => response.json())
           .then(count => {
             this.setState(Object.assign(this.state.user, {entries: count}));
           })
           .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(() => alert("Invalid URL!☻"));
  };

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isSignedIn: true});
    }else if(route === 'signin'){
      this.setState(initialState);
    }
    this.setState({ route: route });
  }

  loadUser = (data) => {
    this.setState(Object.assign(this.state.user, {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }))
  }

  render() {
    return (
      <div className="App">
        <Particles params={partOpts} className='my-particles' />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}></Navigation>
        <Logo></Logo>
        {
          this.state.route === 'home'
            ? <>
              <Rank name={this.state.user.name} count={this.state.user.entries}></Rank>
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}></ImageLinkForm>
              <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}></FaceRecognition>
            </>
            : (
              this.state.route === 'signin'
                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
