import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCandidates } from "../../actions/candidateAction";
import { getUserResults } from "../../actions/resultAction";
import { useTranslation } from "react-i18next";
import { IoBarChartOutline } from "react-icons/io5";
import { FaChartLine  } from "react-icons/fa";


const ResultCard = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const results = useSelector((state) => state.results.results || []);
  const user = useSelector((state) => state.auth.user); // Assuming you have user info in auth state
  const { t } = useTranslation();

  const resultCount = results.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserCandidates());
        await dispatch(getUserResults());
      } catch (err) {
        setError(err.message);
      }
    };

    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  const calculatePercentageChange = () => {
    // Placeholder logic to calculate percentage change compared to last week
    // Replace with actual calculation based on your data
    return 1.5; // Example value
  };

  const percentageChange = calculatePercentageChange();

  return (
    <div className="w-72 h-40 bg-white border border-gray-200 rounded-lg shadow-md p-4 font-roboto">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-start justify-between">
      <div className="flex-1 mb-0">
      <p className="text-gray-600 mt-0 mb-0">
            <span className="text-lg font-semibold">{t("Results")}</span>
          </p>
          <h2 className="text-3xl font-extrabold text-black mt-2">
            {resultCount === 0 ? "0" : resultCount}
          </h2>
        </div>
        <div className="flex items-center bg-blue-100 p-3 ml-24">
          <IoBarChartOutline className="text-blue-500" size={24} />
        </div>
      </div>
      <div className="flex items-center -mt-3">
        <FaChartLine className="text-blue-900" size={20} />
        <p className="text-gray-500 ml-2 mt-3">Total Results</p>
      </div>
    </div>
  );
};

export default ResultCard;
