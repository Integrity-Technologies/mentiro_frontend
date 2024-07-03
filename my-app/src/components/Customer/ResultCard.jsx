import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCandidates } from "../../actions/candidateAction";
import { getUserResults } from "../../actions/resultAction";
import { useTranslation } from "react-i18next";
import { IoBarChartOutline } from "react-icons/io5";

const ResultCard = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const results = useSelector((state) => state.results.results || []);
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

    fetchData();
  }, [dispatch]);

  const calculatePercentageChange = () => {
    // Placeholder logic to calculate percentage change compared to last week
    // Replace with actual calculation based on your data
    return 1.5; // Example value
  };

  const percentageChange = calculatePercentageChange();

  return (
    <div className="max-w-xs w-100 bg-white border border-gray-200 rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div>
        <p className="text-gray-600 mt-2">
            <span className="text-lg font-semibold">{t("Results")}</span>
          </p>
          <h2 className="text-3xl font-extrabold text-black-600">
            {resultCount === 0 ? "0" : resultCount}
          </h2>
         
        </div>
        <div className="flex items-center bg-blue-100 p-3 ml-28">
          <IoBarChartOutline className="text-blue-500" size={24} />
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
