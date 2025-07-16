import './Loader.css'; // Create and import a CSS file for the styles
import React from 'react';

export default function Loader() {
  return (
    <div className="loader">
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
      <div className="circle" />
    </div>
  );
}
