import React from "react";

import "./Card.scss";
import useDeviceOrientation from '../../src/useDeviceOrientation';

const Card: React.FC = () => {
  const { transformStyle, resetPivotOrientation } = useDeviceOrientation();

  return (
    <>
      <svg 
        className="card-component" style={transformStyle} onClick={resetPivotOrientation} 
        width="168" height="224" viewBox="0 0 168 224" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="168" height="224" rx="20" fill="#13BD7E"/>
      </svg>
      <br />
      <br />
      <p>Touch card and Revise orientation</p>
    </>
    );
  }

export default Card;
