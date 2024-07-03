import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCandidates } from "../../actions/candidateAction";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";
import { FaUserCircle } from "react-icons/fa";

const CandidateCard = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const candidates = useSelector((state) => state.candidates?.candidates || []);
  const { t } = useTranslation();

  const candidatesCount = candidates.length;

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

  if (candidates.length === 0) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error fetching candidates: {error}
      </div>
    );
  }

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
        <p className="text-gray-600 mt-2">
            <span className="text-lg font-semibold">Candidates</span>
          </p>
          <h2 className="text-3xl font-extrabold text-black-600">
            {candidatesCount}
          </h2>
         
        </div>
        <div className="bg-blue-100 rounded-full p-2 ml-28">
          <FaUserCircle className="text-blue-500" size={28} />
        </div>
        <div>
          <Chart options={options} series={series} type="donut" width="120" />
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
