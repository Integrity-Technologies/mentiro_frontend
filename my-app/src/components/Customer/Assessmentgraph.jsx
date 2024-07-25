import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAssessments } from "../../actions/AssesmentAction";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";
import { FaListCheck } from "react-icons/fa6";
import { FaChartLine  } from "react-icons/fa";


const Assessmentgraph = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const assessments = useSelector((state) => state.assessment);
  const { t } = useTranslation();

  // Assuming activeCompany is fetched from localStorage as in your ActiveAssessment component
  // Assuming activeCompany is fetched from localStorage as in your ActiveAssessment component
  // const activeCompany = JSON.parse(localStorage.getItem("activeCompany"));

  // Filter assessments based on active company ID
  // const filteredAssessments = assessments?.assessments?.assessments?.filter(
  //   (assessment) => assessment.company_id === activeCompany?.id
  // );

  const assessmentsCount = assessments?.assessments?.assessments?.length || 0;


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

  // if (loading) {
  //   return <div className="text-center">Loading...</div>;
  // }

  if (error && assessmentsCount === 0) {
    return (
      <div className="text-center text-yellow-700">
        {t("graphView.Assessment.NoData")}
      </div>
    );
  }

  return (
    <div className="w-72 h-40 bg-white border border-gray-200 rounded-lg shadow-md p-4 font-roboto">
      <div className="flex items-start justify-between">
      <div className="flex-1 mb-0">
      <p className="text-gray-600 mt-0 mb-0">
            <span className="text-lg font-semibold">Assessments</span>
          </p>
          <h2 className="text-3xl font-extrabold text-black mt-2">
            {assessmentsCount}
          </h2>
          
        </div>
        <div className="flex items-center bg-blue-100 p-3 ml-20">
          <FaListCheck className="text-blue-500" size={24} />
        </div>
        <div>
          <Chart options={options} series={series} type="radialBar" width="120" />
        </div>
      </div>
      <div className="flex items-center -mt-3">
        <FaChartLine className="text-blue-900" size={20} />
        <p className="text-gray-500 ml-2 mt-3">Total Assessments</p>
      </div>
    </div>
  );
};

export default Assessmentgraph;
