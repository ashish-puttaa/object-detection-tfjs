import React from 'react';

import '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import './App.scss';

interface Predition {
   bbox: number[];
   class: string;
   score: number;
}

const App: React.FC = () => {
   const [prediction, setPrediction] = React.useState('');
   const [isLoading, setLoading] = React.useState(false);
   const [imageUrl, setImageUrl] = React.useState(
      'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
   );

   const inputRef = React.useRef<HTMLInputElement>(null);
   const imageRef = React.useRef<HTMLImageElement>(null);

   const clickHandler = () => {
      predictImage();
   };

   const predictImage = async () => {
      setLoading(true);

      const model = await cocoSsd.load();
      const predictions: Predition[] = await model.detect(imageRef.current!);

      if (predictions.length > 0) setPrediction(predictions[0].class);
      else setPrediction('Cannot detect this image. Try another one.');

      setLoading(false);
   };

   const changeImage = () => {
      setPrediction('');
      setImageUrl(inputRef.current!.value);
   };

   return (
      <div className="App">
         <h2>Object Detection using TensorFlow.js</h2>

         <div className="image">
            <img ref={imageRef} src={imageUrl} alt="apple" crossOrigin="anonymous" />
            {prediction && (
               <div className="overlay">
                  <h1>{prediction}</h1>
               </div>
            )}
         </div>

         <div className="change-image">
            <input type="text" ref={inputRef} placeholder="Paste a url" defaultValue={imageUrl} />
            <button className="btn btn--red" onClick={changeImage}>
               Change Image
            </button>
         </div>

         <button className="btn btn--blue btn--large" onClick={clickHandler}>
            Predict
         </button>

         {isLoading && <p>Loading...</p>}
      </div>
   );
};

export default App;
