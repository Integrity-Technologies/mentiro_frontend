import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCandidates } from "../../actions/candidateAction";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";
import { FaUserCircle } from "react-icons/fa";

const DonutGraph = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const candidates = useSelector((state) => state.candidates);
  const candidatesCount = candidates?.candidates?.length || 0;
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserCandidates());
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [dispatch]);

  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Candidates"],
    colors: ["#52dcff", "#00FF99", "#9966FF"], // Add more colors here
    legend: {
      position: "right",
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}`;
        },
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
      },
    },
  };

  const series = [candidatesCount];

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-black-600">{candidatesCount}</h2>
          <p className="text-gray-600 flex items-center mt-2">
            <FaUserCircle className="mr-2 text-black-600" size={30} />
            <span className="text-lg font-semibold">Candidates</span>
          </p>
        </div>
        <div>
          {error || candidatesCount === 0 ? (
            <p className="text-red-500 font-bold">
              {error
                ? t("graphView.Candidate.Error")
                : t("graphView.Candidate.NoData")}
            </p>
          ) : (
            <Chart options={options} series={series} type="donut" width="120" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DonutGraph;