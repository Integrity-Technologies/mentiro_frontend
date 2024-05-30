import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getUserCandidates } from "../../actions/candidateAction";
import { getUserResults } from "../../actions/resultAction";
import { useTranslation } from "react-i18next";

const CandidateGraph = () => {
  const dispatch = useDispatch();
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [error, setError] = useState(null);
  const candidates = useSelector((state) => state.candidates);
  const results = useSelector((state) => state.results);
  const { t } = useTranslation();

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

  const handleCandidateChange = (event) => {
    const candidateId = parseInt(event.target.value, 10);
    setSelectedCandidateId(candidateId);
  };

  const generateChartData = () => {
    if (!candidates || !results || !results.results) return { series: [] };

    const data = [];
    results.results.forEach((candidate) => {
      candidate.assessments.forEach((assessment) => {
        assessment.tests.forEach((test) => {
          data.push({
            name: candidate.candidate_name,
            data: test.score !== null ? test.score : 0,
            test: test.name,
          });
        });
      });
    });

    const heatmapData = data.reduce((acc, item) => {
      let existing = acc.find((el) => el.name === item.test);
      if (existing) {
        existing.data.push({ x: item.name, y: item.data });
      } else {
        acc.push({ name: item.test, data: [{ x: item.name, y: item.data }] });
      }
      return acc;
    }, []);

    return { series: heatmapData };
  };

  const chartData = generateChartData();

  const chartOptions = {
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
      background: '#E5E7EB', // Set background color to grey
    },
    xaxis: {
      title: {
        text: t("graphView.Candidate.Tests"),
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
      heatmap: {
        colorScale: {
          ranges: [
            { from: 0, to: 50, color: "#F56C6C", name: "Low" },
            { from: 51, to: 75, color: "#E6A23C", name: "Medium" },
            { from: 76, to: 100, color: "#67C23A", name: "High" },
          ],
        },
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
      {error ? (
        <p className="text-red-500 font-bold">
          {t("graphView.Candidate.Error")}
        </p>
      ) : (
        <>
          <div className="w-full h-64 mb-4 bg-gray-100">
            {chartData.series.length > 0 && (
              <ApexCharts
                options={chartOptions}
                series={chartData.series}
                type="heatmap"
                height={350}
              />
            )}
          </div>
          <div className="w-full mt-20 flex justify-center">
            <select
              onChange={handleCandidateChange}
              className="p-2 border border-gray-300 rounded-lg w-60 hover:shadow-lg transition-shadow bg-gray-300"
            >
              <option value="">{t("graphView.selectCandidate")}</option>
              {results.results.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.candidate_name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateGraph;
