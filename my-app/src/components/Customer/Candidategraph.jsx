import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getUserCandidates } from "../../actions/candidateAction";
import { getUserResults } from "../../actions/resultAction";
import { useTranslation } from "react-i18next";
import ViewTestResult from "./ViewTestResult";

const CandidateGraph = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const results = useSelector((state) => state.results);
  const { t } = useTranslation();
  const [showResult, setShowResult] = useState(false); // State to control rendering of ViewTestResult

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserCandidates());
        await dispatch(getUserResults());
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [dispatch]);

  const generateChartData = () => {
    if (!results || !results.results) return { series: [] };

    const data = {};
    results.results.forEach((candidate) => {
      candidate.assessments.forEach((assessment) => {
        assessment.tests.forEach((test) => {
          if (!data[test.name]) {
            data[test.name] = [];
          }
          data[test.name].push({
            x: candidate.candidate_name,
            y: test.score !== null ? test.score : 0,
          });
        });
      });
    });

    return { series: Object.entries(data).map(([name, series]) => ({ name, data: series })) };
  };

  const chartData = generateChartData();

  // Function to handle navigation to result menu
  const goToResultMenu = () => {
    setShowResult(true); // Set showResult to true to render ViewTestResult
  };

  const chartOptions = {
    chart: {
      type: "bar", // Changed chart type to "bar" for column chart
      toolbar: {
        show: false,
      },
      background: "#E5E7EB", // Set background color to grey
    },
    xaxis: {
      title: {
        text: t("graphView.Candidate.Name"),
        style: {
          fontWeight: "bold",
          color: "#333",
        },
      },
      labels: {
        style: {
          colors: "#333",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: t("graphView.Candidate.Scores"),
        style: {
          fontWeight: "bold",
          color: "#333",
        },
      },
      labels: {
        style: {
          colors: "#333",
          fontSize: "12px",
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        colors: ["#333"],
      },
    },
    tooltip: {
      theme: "dark",
    },
    legend: {
      horizontalAlign: "left",
      labels: {
        colors: "#333",
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4 bg-gray-100">
      <div className="w-full mb-4 bg-gray-100">
        {/* Chart Component */}
        {chartData.series.length > 0 && (
          <ApexCharts
            options={chartOptions}
            series={chartData.series}
            type="bar" // Changed type to "bar" for column chart
            height={350}
          />
        )}
      </div>
      {/* Conditional rendering of ViewTestResult */}
      {showResult && <ViewTestResult />}
      {/* Button Component with onClick handler */}
      {!showResult && (
        <button
          onClick={goToResultMenu}
          className="p-2 border border-gray-300 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          {t("graphView.gotoResultMenu")}
        </button>
      )}
    </div>
  );
};

export default CandidateGraph;





