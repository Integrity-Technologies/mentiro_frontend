import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SimplePieChart = () => {
  const chartContainer = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['Candidates Processed', 'Assessments Created'],
      datasets: [{
        label: 'Count',
        data: [2, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      }]
    };

    const options = {
      responsive: true
    };

    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      new Chart(ctx, {
        type: 'pie', // Change type to 'pie'
        data: data,
        options: options
      });
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <canvas ref={chartContainer} className="chartjs-render-monitor" width="400" height="400"></canvas>
        </div>
      </div>
    </div>
  );
};

export default SimplePieChart;
