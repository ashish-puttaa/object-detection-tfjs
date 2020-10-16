import styled, { css } from 'styled-components';
import { lighten } from 'polished';

const Button = css`
   width: max-content;
   padding: 12px 25px;
   outline: none;
   border: none;
   border-radius: 100px;
   font-size: 16px;
   cursor: pointer;
`;

/* Wrapper */

export const Wrapper = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

/* Video Container */

export const VideoContainer = styled.div`
   width: 100%;
   height: 450px;
   position: relative;
   box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.3);
   border-radius: 8px;
   overflow: hidden;
   background-color: #f6efee;

   video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
   }
`;

/* Enable Button */

export const Enable = styled.button`
   ${Button}
   margin: 35px 0;
   background-color: #333;
   color: white;
`;

/* Disable Button */

export const Disable = styled.button`
   ${Button}
   margin: 35px 0;
   background-color: ${lighten(0.3, '#333')};
   color: white;
`;

/* Overlay */

export const Overlay = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   height: 100%;
   width: 100%;
   display: grid;
   place-items: center;
   color: #333;
`;

/* Prediction Text */

export const PredictionText = styled.div`
   background-color: whitesmoke;
   padding: 15px;
   min-width: 40%;
   font-size: 18px;
   border-radius: 10px;
   box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.2);
`;
