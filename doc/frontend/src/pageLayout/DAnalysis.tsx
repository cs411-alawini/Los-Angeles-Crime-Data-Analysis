import React from 'react';
import './DAnalysis.css'
import { ResponsiveContainer, Rectangle, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
const DAnalysis = () => {
  // State for the selected location
  const [selectedLocation, setSelectedLocation] = React.useState('');

  // Placeholder data for locations, dates, and ages
  const locations = ['Location 1', 'Location 2', 'Location 3'];

  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300
    }
  ]

  return (
    <div className="page2-container">
      <h1>Demographic Analysis</h1>
      <div className="filters">
        <span>Area:</span>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

      </div>
      <div className="graphs">
        {/* Placeholder for graphs */}
        <ResponsiveContainer width={1200} height={400}>
          <BarChart layout='vertical' width={500} height={300} data={data} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis  dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="graph">Graph 2</div>
      <div className="graph">Graph 3</div>
    </div>
  );
};

export default DAnalysis;