import React from 'react';
import './DAnalysis.css'
import { ResponsiveContainer,BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
const DAnalysis = () => {
  // State for the selected location
  const [selectedLocation, setSelectedLocation] = React.useState('');

  // Placeholder data for locations, dates, and ages
  const locations = ['Location 1', 'Location 2', 'Location 3'];

  const data = [
    {
      "name": "Central",
      "count": 18810
    },
    {
      "name": "Rampart",
      "count": 14438
    },
    {
      "name": "Southwest",
      "count": 17568
    },
    {
      "name": "Hollenbeck",
      "count": 12557
    },
    {
      "name": "Harbor",
      "count": 14131
    },
    {
      "name": "Hollywood",
      "count": 16988
    },
    {
      "name": "Wilshire",
      "count": 14637
    },
    {
      "name": "Harbor",
      "count": 14131
    },
    {
      "name": "Hollywood",
      "count": 16988
    },
    {
      "name": "Wilshire",
      "count": 14637
    },
    {
      "name": "Harbor",
      "count": 14131
    },
    {
      "name": "Hollywood",
      "count": 16988
    },
    {
      "name": "Wilshire",
      "count": 14637
    },{
      "name": "Harbor",
      "count": 14131
    },
    {
      "name": "Hollywood",
      "count": 16988
    },
    {
      "name": "Wilshire",
      "count": 14637
    },
    {
      "name": "Harbor",
      "count": 14131
    },
    {
      "name": "Hollywood",
      "count": 16988
    },
    {
      "name": "Wilshire",
      "count": 14637
    },
    {
      "name": "Harbor",
      "count": 14131
    },
    {
      "name": "Hollywood",
      "count": 16988
    },
    {
      "name": "Wilshire",
      "count": 14637
    }
  ]

  return (
    <div className="page2-container">
      <div className="graph">
        <h2>111</h2>
        {/* Placeholder for graphs */}
        <ResponsiveContainer width="100%" height="100%" >
          <BarChart  data={data} title="Graph 1" margin={{
            top: 0,
            right: 20,
            bottom: 30,
            left: 40,
          }}
            layout='vertical'
            >
            
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" interval={0}/>
            <Tooltip />
            <CartesianGrid />
            <Legend />
            <Bar dataKey="count" barSize={10} fill="#413ea0" layout='vertical' />
          </BarChart>
        </ResponsiveContainer>
      </div>

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
      
      <div className="graph">Graph 2</div>
      <div className="graph">Graph 3</div>

      
    </div>
  );
};

export default DAnalysis;