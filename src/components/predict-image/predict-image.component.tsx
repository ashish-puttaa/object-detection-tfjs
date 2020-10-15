import React from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import Prediction from '../../modals/prediction.modal';

import { Wrapper, Overlay, ImageContainer, ChangeImage, PredictBtn } from './predict-image.styles';

const DEFAULT_IMAGE =
   'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';

interface PredictImageProps {
   modal?: cocoSsd.ObjectDetection;
}

const PredictImage: React.FC<PredictImageProps> = ({ modal }) => {
   const [prediction, setPrediction] = React.useState('');
   const [isLoading, setLoading] = React.useState(false);
   const [imageUrl, setImageUrl] = React.useState(DEFAULT_IMAGE);

   const [isImageBroken, setImageBroken] = React.useState(false);

   const inputRef = React.useRef<HTMLInputElement>(null);
   const imageRef = React.useRef<HTMLImageElement>(null);

   React.useEffect(() => {
      imageRef.current?.addEventListener('error', () => {
         setImageBroken(true);
      });
   }, [imageUrl]);

   const predictImage = async () => {
      if (isImageBroken) {
         return;
      }

      setLoading(true);

      const predictions: Prediction[] = await modal!.detect(imageRef.current!);

      if (predictions.length > 0) setPrediction(predictions[0].class);
      else setPrediction('Cannot detect this image. Try another one.');

      setLoading(false);
   };

   const changeImage = () => {
      setPrediction('');
      setImageUrl(inputRef.current!.value);
      setImageBroken(false);
   };

   return (
      <Wrapper>
         <ImageContainer>
            {isImageBroken ? (
               <Overlay>
                  <div>
                     <h1>Invalid Image</h1>
                     <p>Please enter a different url.</p>
                  </div>
               </Overlay>
            ) : (
               <img ref={imageRef} src={imageUrl} alt="apple" crossOrigin="anonymous" />
            )}

            {prediction && (
               <Overlay faded>
                  <h1>{prediction}</h1>
               </Overlay>
            )}
         </ImageContainer>

         <ChangeImage>
            <input type="text" ref={inputRef} placeholder="Paste a url" defaultValue={imageUrl} />
            <button onClick={changeImage}>Change</button>
         </ChangeImage>

         <PredictBtn onClick={predictImage}>Predict</PredictBtn>

         {isLoading && <p>Loading...</p>}
      </Wrapper>
   );
};

export default PredictImage;
