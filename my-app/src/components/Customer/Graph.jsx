import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DualLineGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Keep track of the chart instance

  useEffect(() => {
    if (chartInstanceRef.current !== null) {
      // Destroy the existing chart instance before initializing a new one
      chartInstanceRef.current.destroy();
    }

    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Assessments Created',
              data: data.assessments,
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 2,
              fill: false,
              yAxisID: 'assessments-y-axis',
            },
            {
              label: 'Candidates Processed',
              data: data.candidates,
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 2,
              fill: false,
              yAxisID: 'candidates-y-axis',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            assessments: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Assessments Created',
              },
            },
            candidates: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Candidates Processed',
              },
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        },
      });

      // Save the chart instance to be able to destroy it later
      chartInstanceRef.current = newChartInstance;
    }

    return () => {
      // Clean up function to destroy the chart instance when the component unmounts
      if (chartInstanceRef.current !== null) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} className="border border-solid border-black outline-none" style={{ width: '100%', height: '90vh' }} />;
};

export default DualLineGraph;

