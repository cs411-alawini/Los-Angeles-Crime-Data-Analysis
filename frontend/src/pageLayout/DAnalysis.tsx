import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Label } from 'recharts';
import './DAnalysis.css'

const DAnalysis = () => {
  // State for the selected location
  const [selectedLocation, setSelectedLocation] = React.useState('');
  // Placeholder data for locations, dates, and ages
  const [locations, setLocations] = useState<string[]>([]);
  const [graph1, setGraph1] = useState<any>([])
  const [data1, setData1] = useState<any>([])
  const [data2, setData2] = useState<any>([])
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const getGraph1Data = async () => {
      try {
        const res = await axios.get("http://35.209.203.48/graph1")
        const areas: string[] = []
        setGraph1(res.data)
        res.data.forEach((location: any) => {
          areas.push(location.Division)
        });
        setLocations(areas)
      } catch (error) {

      }
    }
    getGraph1Data()
  }, [])

  useEffect(() => {
    const getGraph2Data = async () => {
      if (selectedLocation === "") { setIsVisible(false); return }
      const resData1 = await axios.get(`http://35.209.203.48/graph2?Division=${selectedLocation}`)
      const resData2 = await axios.get(`http://35.209.203.48/graph3?Division=${selectedLocation}`)

      const data1 = resData1.data
      const updatedData = data1.map((item: { timeSlot: any; }) => ({
        ...item,
        timeSlot: updateTimeSlotFormat(item.timeSlot),
      }));
      setData2(resData2.data)
      setData1(updatedData)
      setIsVisible(true)
    }

    const updateTimeSlotFormat = (timeSlot: any) => {
      const start = timeSlot.split('-')[0];
      const formattedTimeSlot = `${start.substring(0, 5)}`;
      return formattedTimeSlot;
    };

    getGraph2Data()
  }, [selectedLocation])

  const divStyle = { height: isVisible ? '720px' : '50px' }
  return (
    <div className="page2-container">
      <div className="graph">
        <h2>Division VS Crime Number</h2>
        {/* Placeholder for graphs */}
        <ResponsiveContainer width="100%" height="100%" >

          <BarChart data={graph1} title="Graph 1" margin={{
            top: 0,
            right: 40,
            bottom: 30,
            left: 25,
          }}
            layout='vertical'
          >
            <Legend verticalAlign="bottom" align="right" />
            <XAxis type="number">
              <Label value="Crime Number" position={'bottom'} fontSize={20} />
            </XAxis>
            <YAxis dataKey="Division" type="category" interval={0} width={180} >
              <Label value="Division" angle={-90} position={'left'} fontSize={20} offset={15} />
            </YAxis>
            <Tooltip />
            <CartesianGrid />
            <Bar dataKey="COUNT(*)" barSize={10} fill="#413ea0" layout='vertical' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="area-graphs-wrapper" style={divStyle}>
        <div className="filters area-select">
        <label htmlFor="filter-crime-type" className='filter'> Select an area to get more information : </label>
          <select  className='filter-crime-type'
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value={''}>NONE</option>
            {locations.map((location,id) => (
              <option key={id} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        {isVisible &&
          <div className="graph-wrapper-contianer">
            <div className="graph in-graph">
              <h2>Time VS Crime Number</h2>
              <ResponsiveContainer width="100%" height={620} >
                <BarChart data={data1} margin={{
                  top: 0,
                  right: 20,
                  bottom: 60,
                  left: 20,
                }}>

                  <XAxis dataKey="timeSlot" type="category" interval={0} angle={-90} tickMargin={20}>
                    <Label value="Time" position={'bottom'} fontSize={20} offset={30} />
                  </XAxis>
                  <YAxis type="number">
                    <Label value="Crime Number" angle={-90} position={'left'} fontSize={20} offset={5} />
                  </YAxis>
                  <Tooltip />
                  <CartesianGrid />
                  <Bar dataKey="crimeNum" barSize={20} fill="#413ea0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="graph in-graph">
              <h2>Month VS Crime Number</h2>
              <ResponsiveContainer width="100%" height={620} >
                <BarChart data={data2} margin={{
                  top: 0,
                  right: 20,
                  bottom: 60,
                  left: 20,
                }}>

                  <XAxis dataKey="month" type="category" interval={0}>
                  <Label value="Month" position={'bottom'} fontSize={20} offset={20} />
                  </XAxis>
                  <YAxis type="number">
                    <Label value="Crime Number" angle={-90} position={'left'} fontSize={20} offset={5} />
                  </YAxis>
                  <Tooltip />
                  <CartesianGrid />
                  <Bar dataKey="crimeNum" barSize={20} fill="#413ea0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default DAnalysis;