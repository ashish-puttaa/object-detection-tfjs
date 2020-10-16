import React from 'react';

import { Prediction, DetectionModal } from '../../modals/prediction.modal';

import {
   Wrapper,
   PredictionText,
   Enable,
   Disable,
   Overlay,
   VideoContainer,
} from './predict-video.styles';

interface PredictVideoProps {
   modal: DetectionModal;
}

const PredictVideo: React.FC<PredictVideoProps> = ({ modal }) => {
   const [isVideoRunning, setVideoRunning] = React.useState(false);
   const [prediction, setPrediction] = React.useState<Prediction>();
   const videoRef = React.useRef<HTMLVideoElement>(null);
   const [requestId, setRequestId] = React.useState<number>();

   const cleanUp = React.useRef<() => void>();

   React.useEffect(() => {
      return () => {
         if (cleanUp.current) cleanUp.current!();
      };
   }, []);

   const [stream, setStream] = React.useState<MediaStream>();

   const detectObject = async () => {
      const video = videoRef.current!;

      const predictions = await modal.detect(video);

      if (predictions.length > 0 && predictions[0].score > 0.6) setPrediction(predictions[0]);

      const reqId = requestAnimationFrame(detectObject);
      setRequestId(() => reqId);
   };

   const startVideo = async () => {
      setVideoRunning(true);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);

      const video = videoRef.current!;
      video.srcObject = stream;
      video.addEventListener('loadeddata', detectObject);

      cleanUp.current = () => video.removeEventListener('loadeddata', detectObject);
   };

   const stopVideo = async () => {
      stream!.getTracks().forEach((track) => {
         if (track.readyState === 'live' && track.kind === 'video') {
            track.stop();
         }
      });

      cleanUp.current!();
      setVideoRunning(false);
      setStream(undefined);

      window.cancelAnimationFrame(requestId!);
   };

   return (
      <Wrapper>
         <VideoContainer>
            {isVideoRunning ? (
               <video ref={videoRef} autoPlay />
            ) : (
               <Overlay>
                  <div>
                     <h1>No Video Source</h1>
                     <p>Please enable the webcam to continue.</p>
                  </div>
               </Overlay>
            )}
         </VideoContainer>

         {!isVideoRunning ? (
            <Enable onClick={startVideo}>Enable webcam</Enable>
         ) : (
            <Disable onClick={stopVideo}>Disable webcam</Disable>
         )}

         {isVideoRunning && prediction && <PredictionText>{prediction.class}</PredictionText>}
      </Wrapper>
   );
};

export default PredictVideo;
