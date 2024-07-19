import React from 'react';

const BallProgressBar = ({ steps, currentStep, labels }) => {

  console.log('Current Step:', currentStep);

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center w-75">
        {Array.from({ length: steps }).map((_, index) => (
          <React.Fragment key={index}>
            {/* Render the ball */}
            <div className="flex flex-col items-center mx-2">
              <div
                className={`w-8 h-8 rounded-full ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                } flex items-center justify-center text-white font-bold shadow-lg transition-transform duration-300 ease-in-out transform ${
                  index === currentStep ? 'scale-110' : 'scale-100'
                } hover:scale-110`}
              >
                {index + 1}
              </div>
              {/* Render the label */}
              <span className="mt-2 text-center text-sm font-medium text-gray-700">
                {labels[index]}
              </span>
            </div>
            {/* Render the line connecting to the next ball if it's not the last ball */}
            {index < steps - 1 && (
              <div
                className={`flex-auto h-2 mx-2 ${
                  index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                } transition-colors duration-300`}
                style={{ width: 'calc(100% / (steps - 1) - 1rem)' }} // Dynamic width
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BallProgressBar;






