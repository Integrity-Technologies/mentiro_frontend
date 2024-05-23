import React from 'react';

const BallProgressBar = ({ steps, currentStep, labels }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center">
        {Array.from({ length: steps }).map((_, index) => (
          <React.Fragment key={index}>
            {/* Render the ball */}
            <div className="flex flex-col items-center mx-4">
              <div
                className={`w-8 h-8 rounded-full ${
                  index <= currentStep ? 'bg-green-500' : 'bg-gray-300'
                } flex items-center justify-center text-white font-bold`}
              >
                {index + 1}
              </div>
              {/* Render the label */}
              <span className="mt-4 text-center text-sm">
                {labels[index]}
              </span>
            </div>
            {/* Render the line connecting to the next ball if it's not the last ball */}
            {index < steps - 1 && (
              <div
                className={`flex-auto h-1 mx-4 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
                style={{ width: '100px' }} // Increased the width to 100px
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BallProgressBar;