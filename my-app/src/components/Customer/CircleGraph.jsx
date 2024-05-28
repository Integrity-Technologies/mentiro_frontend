import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from "react-redux";
import { getAllAssessments } from "../../actions/AssesmentAction";
import { useTranslation } from "react-i18next";

const CircleGraph = () => {
    const chartContainer = useRef(null);
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

    useEffect(() => {
        if (loading || error) return;

        const ctx = chartContainer.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Assessments'],
                datasets: [{
                    label: "Assessments Processed",
                    data: [assessmentsCount],
                    backgroundColor: [
                        'blue',
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                cutout: '50%',
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}`;
                            }
                        }
                    }
                }
            }
        });

        return () => {
            if (myChart) {
                myChart.destroy();
            }
        };
    }, [assessmentsCount, loading, error]);

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
        <div className="w-full h-full flex justify-center items-center">
            <canvas ref={chartContainer} className="w-full h-full"></canvas>
        </div>
    );
};

export default CircleGraph;