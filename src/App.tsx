import * as React from 'react';
import '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

import PredictImage from './components/predict-image/predict-image.component';

import './App.scss';

const App: React.FC = () => {
   const [isModalLoading, setModalLoading] = React.useState(true);
   const [modal, setModal] = React.useState<cocoSsd.ObjectDetection>();

   const loadModal = async () => {
      const ssdModal = await cocoSsd.load();
      setModal(ssdModal);
      setModalLoading(false);
   };

   React.useEffect(() => {
      loadModal();
   }, []);

   return (
      <div className="App">
         {isModalLoading ? (
            <div className="loading">
               <h1>Loading Modal...</h1>
            </div>
         ) : (
            <React.Fragment>
               <h2>Object Detection using TensorFlow.js</h2>
               <PredictImage modal={modal} />
            </React.Fragment>
         )}
      </div>
   );
};

export default App;
