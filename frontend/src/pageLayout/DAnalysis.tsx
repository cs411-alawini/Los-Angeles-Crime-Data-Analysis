import React from 'react';
import './DAnalysis.css'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
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
    }, {
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

  const data1 = [
    {
      "name": "Jan",
      "count": 18810
    },
    {
      "name": "Feb",
      "count": 14438
    },
    {
      "name": "Mar",
      "count": 17568
    },
    {
      "name": "Apr",
      "count": 12557
    },
    {
      "name": "May",
      "count": 14131
    },
    {
      "name": "Jun",
      "count": 16988
    },
    {
      "name": "Jul",
      "count": 14637
    },
    {
      "name": "Aug",
      "count": 14131
    },
    {
      "name": "Sep",
      "count": 16988
    },
    {
      "name": "Oct",
      "count": 14637
    },
    {
      "name": "Nov",
      "count": 14131
    },
    {
      "name": "Dec",
      "count": 16988
    }
  ]

  const data2 = [
    {
      "name": "0-2",
      "count": 18810
    },
    {
      "name": "2-4",
      "count": 14438
    },
    {
      "name": "4-6",
      "count": 17568
    },
    {
      "name": "6-8",
      "count": 12557
    },
    {
      "name": "8-10",
      "count": 14131
    },
    {
      "name": "10-12",
      "count": 16988
    },
    {
      "name": "12-14",
      "count": 14637
    },
    {
      "name": "14-16",
      "count": 14131
    },
    {
      "name": "16-18",
      "count": 16988
    },
    {
      "name": "18-20",
      "count": 14637
    },
    {
      "name": "20-22",
      "count": 14131
    },
    {
      "name": "22-0",
      "count": 16988
    }
  ]


  return (
    <div className="page2-container">
      <div className="graph">
        <h2>111</h2>
        {/* Placeholder for graphs */}
        <ResponsiveContainer width="100%" height="100%" >
          <BarChart data={data} title="Graph 1" margin={{
            top: 0,
            right: 20,
            bottom: 30,
            left: 40,
          }}
            layout='vertical'
          >

            <XAxis type="number" />
            <YAxis dataKey="name" type="category" interval={0} />
            <Tooltip />
            <CartesianGrid />
            <Legend />
            <Bar dataKey="count" barSize={10} fill="#413ea0" layout='vertical' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="area-graphs-wrapper">
        <div className="filters area-select">
          <span>Area : </span>
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
        <div className="graph-wrapper-contianer">
          <div className="graph in-graph">
            <h2>222</h2>
            <ResponsiveContainer width="100%" height="100%" >
              <BarChart data={data1} margin={{
                top: 0,
                right: 20,
                bottom: 30,
                left: 20,
              }}>

                <XAxis dataKey="name" type="category" interval={0} />
                <YAxis type="number" />
                <Tooltip />
                <CartesianGrid />
                <Legend />
                <Bar dataKey="count" barSize={20} fill="#413ea0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="graph in-graph">
            <h2>333</h2>
            <ResponsiveContainer width="100%" height="100%" >
              <BarChart data={data2} margin={{
                top: 0,
                right: 20,
                bottom: 30,
                left: 20,
              }}>

                <XAxis dataKey="name" type="category" interval={0} />
                <YAxis type="number" />
                <Tooltip />
                <CartesianGrid />
                <Legend />
                <Bar dataKey="count" barSize={20} fill="#413ea0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>





    </div>
  );
};

export default DAnalysis;