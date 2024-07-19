import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCandidates } from "../../actions/candidateAction";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";
import { LuUser } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";

const CandidateCard = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const candidates = useSelector((state) => state.candidates?.candidates || []);
  const { t } = useTranslation();

  // Set candidatesCount to 0 if there's an error or the candidates array is empty
  const candidatesCount = candidates.length || 0;

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
    <div className="w-72 h-40 bg-white border border-gray-200 rounded-lg shadow-md p-4 font-roboto">
      <div className="flex items-start justify-between">
        <div className="flex-1 mb-0">
          <p className="text-gray-600 mt-0 mb-0">
            <span className="text-lg font-semibold">{t("Candidates")}</span>
          </p>
          <h2 className="text-3xl font-extrabold text-black mt-2">
            {candidatesCount}
          </h2>
        </div>
        <div className="flex items-center bg-blue-100 p-3 ml-24">
          <LuUser className="text-blue-500" size={24} />
        </div>
        <div>
          <Chart options={options} series={series} type="donut" width="100" />
        </div>
      </div>
      <div className="flex items-center -mt-3">
        <FaChartLine className="text-blue-900" size={20} />
        <p className="text-gray-500 ml-2 mt-3">Total Candidates</p>
      </div>
    </div>
  );
};

export default CandidateCard;
