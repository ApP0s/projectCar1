import React from 'react';
import carJson from "../dataRod/taladrod-cars.min.json";

const Dashboard = () => {
  const carsArray = carJson.Cars; // Access the array of cars from the "Cars" key

  // Step 1: Process the data to group by brand and model
  const brandData = carsArray.reduce((acc, car) => {
    const brand = car.NameMMT.split(' ')[0]; // Get the brand name (e.g., "HONDA")
    const model = car.Model;

    if (!acc[brand]) {
      acc[brand] = { count: 0, totalValue: 0, models: {} };
    }

    if (!acc[brand].models[model]) {
      acc[brand].models[model] = { count: 0, totalValue: 0 };
    }

    // Convert price to number, remove commas if present
    const price = parseInt(car.Prc.replace(/,/g, ''));

    acc[brand].count += 1;
    acc[brand].totalValue += price;
    acc[brand].models[model].count += 1;
    acc[brand].models[model].totalValue += price;

    return acc;
  }, {});

  // Step 2: Render the table
  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Brand / Model</th>
            <th>Number of Cars</th>
            <th>Total Value (Baht)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(brandData).map((brand) => (
            <React.Fragment key={brand}>
              <tr>
                <td><strong>{brand}</strong></td>
                <td>{brandData[brand].count}</td>
                <td>{brandData[brand].totalValue.toLocaleString()}</td>
              </tr>
              {Object.keys(brandData[brand].models).map((model) => (
                <tr key={model}>
                  <td style={{ paddingLeft: '20px' }}>
                    {brand} / {model}
                  </td>
                  <td>{brandData[brand].models[model].count}</td>
                  <td>{brandData[brand].models[model].totalValue.toLocaleString()}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
