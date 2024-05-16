import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DualLineGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ["Candidates Processed", "Assessments Created"],
      datasets: [
        {
          label: "Count",
          data: [2, 2],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };

    const config = {
      type: "doughnut",
      data: data,
      options: {},
    };

    if (chartRef && chartRef.current) {
      new Chart(chartRef.current, config);
    }

    // Cleanup
    return () => {
      if (chartRef && chartRef.current && chartRef.current.destroy) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <canvas
        className="w-full h-10"
        ref={chartRef}
      ></canvas>
    </div>
  );
};

export default DualLineGraph;
