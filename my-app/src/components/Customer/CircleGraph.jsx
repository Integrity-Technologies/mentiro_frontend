import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllAssessments } from "../../actions/AssesmentAction";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";

const RadialBarGraph = () => {
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
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '70%',
                },
                dataLabels: {
                    name: {
                        show: false, // This hides the label
                    },
                    value: {
                        show: true,
                    },
                },
                track: {
                    background: '#b3e5fc', // Light blue track color
                },
            },
        },
        labels: ['Assessments'],
        colors: ['#0000FF'], // Blue color for the chart
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
        <div className="max-w-sm w-full rounded-lg " > 
           <Chart
                options={options}
                series={series}
                type="radialBar"
                width="380"
            />
        </div>
    );
};

export default RadialBarGraph;






