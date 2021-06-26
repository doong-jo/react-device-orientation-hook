import React from "react";
import Card from "./Card";

export default {
  title: "Card"
};

export const Basic = () => {
  document.body.style.background = 'white';

  return (
    <div style={{ width: '100%', height: '50vh', display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Card />
    </div>
  )
};
