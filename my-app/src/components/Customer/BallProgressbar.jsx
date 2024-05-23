import React from 'react';

const BallProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center items-center">
      {Array.from({ length: steps }).map((_, index) => (
        <React.Fragment key={index}>
          {/* Render the ball */}
          <div
            className={`w-8 h-8 rounded-full ${
              index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
            } flex items-center justify-center text-white font-bold`}
          >
            {index + 1}
          </div>
          {/* Render the line connecting to the next ball if it's not the last ball */}
          {index < steps - 1 && (
            <div
              className={`flex-auto h-1 ${
                index < currentStep ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BallProgressBar;