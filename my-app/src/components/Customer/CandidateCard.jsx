import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCandidates } from "../../actions/candidateAction";
import { getUserResults } from "../../actions/resultAction";
import { useTranslation } from "react-i18next";
import { AiOutlineBarChart } from "react-icons/ai";

const CandidateCard = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const results = useSelector((state) => state.results.results);
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

  const calculatePercentageChange = () => {
    // Logic to calculate percentage change compared to last week
    // Placeholder logic here, should be replaced with actual calculation
    return 1.5;
  };

  const resultCount = results ? results.length : 0;
  const percentageChange = calculatePercentageChange();

  return (
    <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-black-600">{resultCount}</h2>
          <p className="text-gray-600 flex items-center mt-2">
            <AiOutlineBarChart className="mr-2 text-black-600" size={30} />
            <span className="text-lg font-semibold">{t("Results")}</span>
          </p>
        </div>
        <div>
          <svg className="w-20 h-20" viewBox="0 0 36 36">
            <path
              className="text-gray-300"
              d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              className="text-blue-500"
              d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${percentageChange * 20}, 100`} // Example value, adjust based on actual data
            />
          </svg>
        </div>
      </div>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default CandidateCard;