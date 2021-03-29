import React, { useState, useEffect } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '34f64be892c946a6ad549aa64584f86f',
});

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

  const calculateFaceLocation = (data) => {
    const faceData = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    console.log(width, height);

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
  const onButtonSubmit = () => {
    setImgUrl(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => {
        displayFace(calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(box);
  });

  return (
    <div className="App">
      <Particles className="particles" params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={setInput} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition box={box} imgUrl={imgUrl} />
    </div>
  );
};

export default App;
