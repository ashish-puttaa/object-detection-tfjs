import * as React from 'react';
import '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import PredictImage from './components/predict-image/predict-image.component';
import PredictVideo from './components/predict-video/predict-video.component';

import './App.scss';

type Option = 'image' | 'video';

const App: React.FC = () => {
   const [selectedOption, setSelectedOption] = React.useState<Option>('image');

   const [isModalLoading, setModalLoading] = React.useState(true);
   const [modal, setModal] = React.useState<cocoSsd.ObjectDetection>();

   const loadModal = async () => {
      const ssdModal = await cocoSsd.load();
      setModal(ssdModal);
      setModalLoading(false);
   };

   const selectOption = (option: Option) => {
      setSelectedOption(option);
   };

   React.useEffect(() => {
      loadModal();
   }, []);

   return (
      <div className="App">
         <p className="title">
            Object Detection <br /> using&nbsp;
            <a href="https://www.tensorflow.org/js" target="_blank" rel="noopener noreferrer">
               TensorFlow.js
            </a>
         </p>

         {isModalLoading ? (
            <div className="loading">
               <h1>Loading Modal...</h1>
            </div>
         ) : (
            <React.Fragment>
               <div className="switch">
                  <span
                     onClick={() => selectOption('image')}
                     className={`${selectedOption === 'image' && 'selected'}`}
                  >
                     Image
                  </span>
                  <span
                     onClick={() => selectOption('video')}
                     className={`${selectedOption === 'video' && 'selected'}`}
                  >
                     Video
                  </span>
               </div>

               {selectedOption === 'image' && <PredictImage modal={modal!} />}
               {selectedOption === 'video' && <PredictVideo modal={modal!} />}
            </React.Fragment>
         )}
      </div>
   );
};

export default App;
