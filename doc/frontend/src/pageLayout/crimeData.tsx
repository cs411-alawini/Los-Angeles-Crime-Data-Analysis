import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './crimeData.css'
function CrimeData() {
    const crimeList = [{ cid: "10304468", time: "2230", location: "1100 W 39TH PL", crimeType: "BATTERY - SIMPLE ASSAULT" },
    { cid: "10304468", time: "2230", location: "1100 W 39TH PL", crimeType: "BATTERY - SIMPLE ASSAULT" },
    { cid: "10304468", time: "2230", location: "1100 W 39TH PL", crimeType: "BATTERY - SIMPLE ASSAULT" },
    { cid: "10304468", time: "2230", location: "1100 W 39TH PL", crimeType: "BATTERY - SIMPLE ASSAULT" },
    { cid: "10304468", time: "2230", location: "1100 W 39TH PL", crimeType: "BATTERY - SIMPLE ASSAULT" },
    { cid: "10304468", time: "2230", location: "1100 W 39TH PL", crimeType: "BATTERY - SIMPLE ASSAULT" },
    { cid: "10304468", time: "2230", location: "1100 W 39TH PL", crimeType: "BATTERY - SIMPLE ASSAULT" },
    { cid: "10304468", time: "2230", location: "1100 W 39TH PL", crimeType: "BATTERY - SIMPLE ASSAULT" },
    { cid: "10304468", time: "2230", location: "1100 W 39TH PL", crimeType: "BATTERY - SIMPLE ASSAULT" },
    { cid: "10304468", time: "2230", location: "1100 W 39TH PL", crimeType: "BATTERY - SIMPLE ASSAULT" },
    { cid: "10304468", time: "2230", location: "1100 W 39TH PL", crimeType: "BATTERY - SIMPLE ASSAULT" }];
    const crimeTypeList = ["one", "two", "three", "four"];
    const [startDate, setStartDate] = useState<Date>(new Date(Date.now()))
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now()))
    const [location, setLocation] = useState<string>("")
    const [crimeType, setCrimeType] = useState<string>(crimeTypeList[0])

    const fetchData = function (startDate: Date, endDate: Date, location: string, crimeType: string): void {
        alert("start Date: " + startDate + "\nend date: " + endDate + "\nlocation: " + location + "\ncrimt type: " + crimeType)
    }

    const pos = [51.505, -0.09]
    return (
        <div className="page1-container">
            <div className='crime-table-container'>
                <div className='filter-container'>
                    <label htmlFor="start-date" className='filter'> From : </label>
                    <input type="date" id="start-date" className='filter' onChange={(event) => { setStartDate(new Date(event.target.value)) }} value={startDate.toISOString().split('T')[0]} min="2010-01-01" max="2023-12-31" />
                    <label htmlFor="end-date" className='filter'> To : </label>
                    <input type="date" id="end-date" className='filter' onChange={(event) => { setEndDate(new Date(event.target.value)) }} value={endDate.toISOString().split('T')[0]} min={startDate.toISOString().split('T')[0]} max="2023-12-31" />
                    <label htmlFor="filter-location" className='filter'> Location : </label>
                    <input type="text" id="filter-location" className='filter' onChange={(event) => { setLocation(event.target.value) }} placeholder={"location"} />
                    <label htmlFor="filter-crime-type" className='filter'> Crime type: </label>
                    <select className='filter' onChange={(event) => setCrimeType(event.target.value)}>
                        {
                            crimeTypeList.map((crime, id) => {
                                return <option key={id} value={crime}>{crime}</option>
                            })
                        }
                    </select>
                    <button className='filter filter-search' onClick={() => fetchData(startDate, endDate, location, crimeType)}><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className='crime-title-container'>
                    <div className='crime-record title record'>Record #</div>
                    <div className='crime-record title time'>Time Occur</div>
                    <div className='crime-record title location'>Location</div>
                    <div className='crime-record title crime'>Crime Type</div>
                </div>
                <div className='crime-record-box'>
                    {
                        crimeList.map((crime, id) => {
                            return (
                                <div key={id} className='crime-record-container'>
                                    <div className='crime-record-context record'>{crime.cid}</div>
                                    <div className='crime-record-context time'>{crime.time}</div>
                                    <div className='crime-record-context location'>{crime.location}</div>
                                    <div className='crime-record-context crime'>{crime.crimeType}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='crime-map-container'>
                <MapContainer className="crime-map" center={[51.505, -0.09]} zoom={15} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}

export default CrimeData