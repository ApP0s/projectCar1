import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import carJson from '../dataRod/taladrod-cars.min.json'; // Adjust the path as necessary

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Create a map from mkID to brand name
  const brandMap = carJson.MMList.reduce((acc, brand) => {
    acc[brand.mkID] = brand.Name;
    return acc;
  }, {});

  // Count the number of cars per brand using mkID
  const brandCounts = carJson.Cars.reduce((acc, car) => {
    const brandName = brandMap[car.MkID];
    if (brandName) {
      acc[brandName] = (acc[brandName] || 0) + 1;
    }
    return acc;
  }, {});

  // Prepare data for Chart.js
  const chartData = {
    labels: Object.keys(brandCounts), // Brand names
    datasets: [
      {
        label: 'Number of Cars',
        data: Object.values(brandCounts), // Counts of each brand
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6B6B',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6B6B',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Car Brand Distribution</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
