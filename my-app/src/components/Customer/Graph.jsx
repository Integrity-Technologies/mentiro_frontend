import React from 'react';
import CircleGraph from './CircleGraph';
import DonutGraph from './DonutGraph';

const DualGraphs = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 p-5 h-screen bg-gray-100">
            <div className="flex flex-col items-center bg-white p-5 shadow-lg rounded-lg w-80">
                <h2 className="text-xl font-semibold mb-5 text-center">Assessment</h2>
                <CircleGraph />
            </div>
            <div className="flex flex-col items-center bg-white p-5 shadow-lg rounded-lg w-80">
                <h2 className="text-xl font-semibold mb-5 text-center">Candidate</h2>
                <DonutGraph />
            </div>
        </div>
    );
};

export default DualGraphs;