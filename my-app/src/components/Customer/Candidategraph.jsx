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
  const results = useSelector((state) => state.results.results);
  console.log("🚀 ~ CandidateGraph ~ results:", results);
  const { t } = useTranslation();
  const [showResult, setShowResult] = useState(false);

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
    if (!results || results.length === 0) return { series: [], categories: [] };

    let seriesData = [];
    let categories = [];

    results.forEach((candidate) => {
      candidate.assessments.forEach((assessment) => {
        assessment.tests.forEach((test) => {
          categories.push(`${candidate.candidate_name} `);
          seriesData.push(test.score || 0);
        });
      });
    });

    return {
      series: [
        {
          name: t("graphView.Candidate.Scores"),
          data: seriesData,
        },
      ],
      categories,
    };
  };

  const chartData = generateChartData();

  const goToResultMenu = () => {
    setShowResult(true);
  };

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      background: "#E5E7EB",
    },
    colors: ['#00E396'],
    xaxis: {
      categories: chartData.categories,
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
        {chartData.series.length > 0 && (
          <ApexCharts
            options={chartOptions}
            series={chartData.series}
            type="bar"
            height={350}
          />
        )}
      </div>
      {showResult && <ViewTestResult />}
      
    </div>
  );
};

export default CandidateGraph;