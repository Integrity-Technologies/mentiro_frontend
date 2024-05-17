import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidates } from "../../actions/candidateAction";

const DonutGraph = () => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const candidates = useSelector((state) => state.candidates);
  const candidatesCount = candidates?.candidates?.length || 0;

  useEffect(() => {
    dispatch(getAllCandidates());
  }, [dispatch]);

  useEffect(() => {
    const data = {
      labels: ["Candidates Processed"],
      datasets: [
        {
          label: "Count",
          data: [candidatesCount],
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
      options: {
        plugins: {
          legend: {
            position: 'right'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}`;
              }
            }
          }
        }
      },
    };

    if (chartRef.current) {
      const myChart = new Chart(chartRef.current, config);
      return () => myChart.destroy();
    }
  }, [candidatesCount]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <canvas ref={chartRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default DonutGraph;