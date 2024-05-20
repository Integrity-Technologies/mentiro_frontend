import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from "react-redux";
import { getAllAssessments } from "../../actions/AssesmentAction";
import { useTranslation } from "react-i18next";

const CircleGraph = () => {
    const chartContainer = useRef(null);
    const dispatch = useDispatch();
    const assessments = useSelector((state) => state.assessment);
    const assessmentsCount = assessments?.assessments?.assessments?.length || 0;
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(getAllAssessments());
    }, [dispatch]);

    useEffect(() => {
        if (!chartContainer.current || !assessments) return;

        const ctx = chartContainer.current.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Assessments'],
                datasets: [{
                    label: "Assessments Processed",
                    data: [assessmentsCount],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.5)',
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

        return () => myChart.destroy();
    }, [assessments, assessmentsCount]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            {assessmentsCount === 0 ? (
                <p className="text-red-500 font-bold">{t("graphView.Assessment.NoData")}</p>
            ) : (
                <canvas ref={chartContainer} className="w-full h-full"></canvas>
            )}
        </div>
    );
};

export default CircleGraph;