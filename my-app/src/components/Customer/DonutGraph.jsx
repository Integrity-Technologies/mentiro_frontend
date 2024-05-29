import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandidates } from "../../actions/candidateAction";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";

const DonutGraph = () => {
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

  const options = {
    chart: {
      type: 'donut',
    },
    labels: ["Candidates"],
    colors: ['#FF6384', '#36A2EB', '#FFCE56'],
    legend: {
      position: 'right',
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
    <div className="w-full h-full flex justify-center items-center">
      {error || candidatesCount === 0 ? (
        <p className="text-red-500 font-bold">
          {error ? t("graphView.Candidate.Error") : t("graphView.Candidate.NoData")}
        </p>
      ) : (
        <Chart
          options={options}
          series={series}
          type="donut"
          width="380"
        />
      )}
    </div>
  );
};

export default DonutGraph;
