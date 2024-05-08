import React from "react";

const Graph = ({ data }) => {
  // Assume data is an array of numbers representing some sample data for the graph
  // You can replace this with your actual data or use a library like Chart.js for more complex graphs
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <h2 className="text-2xl font-semibold mb-4">Active Assessment</h2>
      </div>
      <div className="col-span-1 flex justify-end items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create New Assessment
        </button>
      </div>
      {data.map((point, index) => (
        <div key={index} className="bg-gray-100 border border-gray-300 rounded-lg p-4 mt-16">
          <h2 className="text-lg font-semibold mb-4">Assessment Graph</h2>
          <div className="h-64 bg-gray-200 flex items-center justify-center">
            {/* Display graph here */}
            <div className="text-center">
              <div key={index} className="mb-2">
                <div
                  className="bg-blue-500 text-white rounded-md py-1"
                  style={{ width: `${point * 10}px` }}
                >
                  {point}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Graph;
