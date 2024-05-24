import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidates } from "../../actions/candidateAction";
import { useTranslation } from "react-i18next";

const DonutGraph = () => {
  const chartRef = useRef(null);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const candidates = useSelector((state) => state.candidates);
  const candidatesCount = candidates?.candidates?.length || 0;
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllCandidates());
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (error) return; // Exit if there was an error

    const data = {
      labels: ["Candidates"],
      datasets: [
        {
          label: "Count",
          data: [candidatesCount],
          backgroundColor: ["rgba(75, 192, 192, 0.5)"],
          borderColor: ["rgba(75, 192, 192, 1)"],
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
            position: "right",
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}`;
              },
            },
          },
        },
      },
    };

    if (chartRef.current) {
      const myChart = new Chart(chartRef.current, config);
      return () => myChart.destroy();
    }
  }, [candidatesCount, error]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {error || candidatesCount === 0 ? (
        <p className="text-red-500 font-bold">
          {error ? t("graphView.Candidate.Error") : t("graphView.Candidate.NoData")}
        </p>
      ) : (
        <canvas ref={chartRef} className="w-full h-full"></canvas>
      )}
    </div>
  );
};

export default DonutGraph;
