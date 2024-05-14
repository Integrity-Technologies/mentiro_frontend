import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SimpleBarGraph = () => {
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
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
      });
    }
  }, []);

  return (
    <div>
      <canvas ref={chartContainer} width="400" height="200"></canvas>
    </div>
  );
};

export default SimpleBarGraph;