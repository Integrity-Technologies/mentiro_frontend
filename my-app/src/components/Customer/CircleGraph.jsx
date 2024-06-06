import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAssessments } from "../../actions/AssesmentAction";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";
import { AiOutlineLineChart } from "react-icons/ai";

const CircleGraph = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const assessments = useSelector((state) => state.assessment);
  const assessmentsCount = assessments?.assessments?.assessments?.length || 0;
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllAssessments());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const options = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "70%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        track: {
          background: "#ccf4ff",
        },
      },
    },
    labels: ["Assessments"],
    colors: ["#52dcff"],
  };

  const series = [assessmentsCount];

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error.response?.status === 500
          ? "Server error, please try again later."
          : "An error occurred, please try again."}
      </div>
    );
  }

  if (assessmentsCount === 0) {
    return (
      <div className="text-center text-yellow-700">
        {t("graphView.Assessment.NoData")}
      </div>
    );
  }

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-black-600">{assessmentsCount}</h2>
          <p className="text-gray-600 flex items-center mt-2">
            <AiOutlineLineChart className="mr-2 text-black-600" size={30} />
            <span className="text-lg font-semibold">Assessments</span>
          </p>
        </div>
        <div>
          <Chart
            options={options}
            series={series}
            type="radialBar"
            width="120"
          />
        </div>
      </div>
    </div>
  );
};

export default CircleGraph;