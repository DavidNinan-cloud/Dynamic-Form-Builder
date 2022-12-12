import React from "react";
import './spinner.css'

const LoadingSpinner = () => {
  const arry = [1, 2, 3, 4, 5];

  return (
    <div className="loading-container">
      {arry.map((j, i) => (
        <span
        id="span"
          className="loading-dot"
          style={{
            animationDelay: `${i * 100}ms`,
            transform: `translateX(${i * 105}%)`
          }}
        ></span>
      ))}
    </div>
  );
};
export default LoadingSpinner;
