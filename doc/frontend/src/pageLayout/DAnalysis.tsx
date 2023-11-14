import React from 'react';
import './DAnalysis.css'
const DAnalysis = () => {
    // State for the selected location
    const [selectedLocation, setSelectedLocation] = React.useState('');
    // State for the selected date
    const [selectedDate, setSelectedDate] = React.useState('');
    // State for the selected age
    const [selectedAge, setSelectedAge] = React.useState('');

    // Placeholder data for locations, dates, and ages
    const locations = ['Location 1', 'Location 2', 'Location 3'];
    const dates = ['2021-01-01', '2021-01-02', '2021-01-03']; // Example dates
    const ages = ['18-24', '25-34', '35-44']; // Example age ranges
  
    return (
        <div className="d-analysis">
          <h1>Demographic Analysis</h1>
          <div className="filters">
            <span>Filters:</span>
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
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {dates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
            >
              {ages.map((age) => (
                <option key={age} value={age}>
                  {age}
                </option>
              ))}
            </select>
          </div>
          <div className="graphs">
            {/* Placeholder for graphs */}
            <div className="graph">Graph 1</div>
            <div className="graph">Graph 2</div>
            <div className="graph">Graph 3</div>
          </div>
        </div>
      );
  };
  
  export default DAnalysis;