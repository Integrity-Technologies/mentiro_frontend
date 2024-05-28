import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { getUserCandidates } from "../../actions/candidateAction";
import { useTranslation } from "react-i18next";
import { getUserResults } from "../../actions/resultAction";

const CandidateGraph = () => {
  const candidateChartRef = useRef(null);
  const resultChartRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
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
    const candidate = candidates?.find((c) => c.id === candidateId);
    setSelectedCandidate(candidate);
  };

  const createChart = (ref, data) => {
    if (ref.current) {
      if (Chart.getChart(ref.current)) {
        Chart.getChart(ref.current).destroy();
      }
      new Chart(ref.current, {
        type: "bar",
        data: data,
        options: {
          plugins: {
            legend: {
              position: "right",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.raw}`;
                },
              },
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  useEffect(() => {
    if (error || !candidates) return;

    const candidatesCount = candidates.length || 0;
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

    createChart(candidateChartRef, data);

    return () => {
      if (candidateChartRef.current) {
        if (Chart.getChart(candidateChartRef.current)) {
          Chart.getChart(candidateChartRef.current).destroy();
        }
      }
    };
  }, [candidates, error]);

  useEffect(() => {
    if (!selectedCandidate || !results) return;

    const candidateResults = results.filter(
      (result) => result.candidateId === selectedCandidate.id
    );

    const testNames = candidateResults.map((result) => result.testName);
    const scores = candidateResults.map((result) => result.score);

    const data = {
      labels: testNames,
      datasets: [
        {
          label: t("graphView.Candidate.Scores"),
          data: scores,
          backgroundColor: "rgba(192, 75, 75, 0.5)",
          borderColor: "rgba(192, 75, 75, 1)",
          borderWidth: 1,
        },
      ],
    };

    createChart(resultChartRef, data);

    return () => {
      if (resultChartRef.current) {
        if (Chart.getChart(resultChartRef.current)) {
          Chart.getChart(resultChartRef.current).destroy();
        }
      }
    };
  }, [selectedCandidate, results, t]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      {error ? (
        <p className="text-red-500 font-bold">{t("graphView.Candidate.Error")}</p>
      ) : (
        <>
          <div className="w-full h-64 mb-4">
            <canvas ref={candidateChartRef} className="w-full h-full"></canvas>
          </div>
          <div className="w-full mt-4">
            <select
              onChange={handleCandidateChange}
              className="p-2 border border-gray-300 rounded w-full hover:shadow-lg transition-shadow"
            >
              <option value="">{t("graphView.SelectCandidate")}</option>
              {candidates?.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.first_name} {candidate.last_name}
                </option>
              ))}
            </select>
          </div>
          {selectedCandidate && (
            <div className="w-full h-full mt-4 flex flex-col md:flex-row justify-around items-center">
              <div className="w-full h-64">
                <h3 className="text-center mb-2 text-lg font-semibold">
                  {selectedCandidate.first_name} {selectedCandidate.last_name} - {t("graphView.Candidate.TestsAndScores")}
                </h3>
                <canvas ref={resultChartRef} className="w-full h-full"></canvas>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CandidateGraph;
