import styled, { css } from 'styled-components';

const Button = css`
   width: max-content;
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

/* Image Container */

export const ImageContainer = styled.div`
   width: 100%;
   height: 500px;

   position: relative;
   box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.3);
   border-radius: 8px;
   overflow: hidden;
   background-color: #f6efee;
   user-select: none;

   img {
      object-fit: cover;
      height: 100%;
      width: 100%;
   }
`;

/* Overlay */

interface OverlayProps {
   faded?: boolean;
}

export const Overlay = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   height: 100%;
   width: 100%;
   display: grid;
   place-items: center;
   color: #333;

   ${(p: OverlayProps) =>
      p.faded &&
      css`
         background-color: rgba(0, 0, 0, 0.3);
         color: white;
      `};
`;

/* Change Image Container */

export const ChangeImage = styled.div`
   width: 85%;
   margin: 20px 0px;
   margin-top: 35px;
   display: flex;
   align-items: center;
   font-size: 16px;

   input {
      flex: 1;
      background-color: #f4f2f2;
      border: none;
      outline: none;
      padding: 12px 30px;
      padding-right: 50px;
      border-radius: 100px;
      transition: all 0.3s;
      margin-right: -55px;
   }
`;

/* Change Button */

export const ChangeBtn = styled.button`
   ${Button}
   margin-left: 15px;
   padding: 12px 20px;
   background-color: rgb(235, 52, 46);
   font-size: inherit;
   color: white;
`;

/* Predict Button */

export const PredictBtn = styled.button`
   ${Button}
   background-color: #333;
   padding: 12px 25px;
   margin-left: 10px;
   color: white;
`;
