import React, { useState, useEffect } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const App = () => {
  const [input, setInput] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signIn');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  });

  const clearInfo = () => {
    setInput('');
    setImgUrl('');
    setBox({});
    setRoute('signIn');
    setIsSignedIn(false);
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    });
  };

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const calculateFaceLocation = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: faceData.left_col * width,
      topRow: faceData.top_row * height,
      rightCol: width - faceData.right_col * width,
      bottomRow: height - faceData.bottom_row * height,
    };
  };

  const displayFace = (box) => {
    setBox(box);
  };
  const onPictureSubmit = () => {
    setImgUrl(input);

    fetch('https://evening-hollows-55343.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        displayFace(calculateFaceLocation(response));
      })
      .then(() =>
        fetch('https://evening-hollows-55343.herokuapp.com/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: user.id,
          }),
        })
          .then((response) => response.json())
          .then((count) => {
            setUser((prevUser) => ({ ...prevUser, entries: count }));
          })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const onRouteChange = (page) => {
    clearInfo();

    setRoute(page);
  };

  useEffect(() => {
    fetch('https://evening-hollows-55343.herokuapp.com/', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .catch(console.log);

    if (route === 'signIn' && 'Register') {
      setIsSignedIn(false);
    } else if (route === 'homePage') {
      setIsSignedIn(true);
    }
  }, [route]);

  return (
    <div className="App">
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Particles className="particles" params={particlesOptions} />
      {route === 'homePage' ? (
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={setInput}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition box={box} imgUrl={imgUrl} />
        </div>
      ) : route === 'signIn' ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
};

export default App;
