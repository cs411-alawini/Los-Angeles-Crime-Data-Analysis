import { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './crimeData.css'
import Modal from "../modal/modal";
import L from 'leaflet';
import CrimeSelector from '../component/crimeSelector';
function CrimeData() {
    var crimes = [{ cid: "103044679", time: "2230", location: "1101 W 39TH PL", crimeType: "BATTERY1 - SIMPLE ASSAULT", LL: [34.0141, -118.2978], victimSex: "M", victimAge: 20 },
    { cid: "103044681", time: "2231", location: "11002 W 391TH PL", crimeType: "BATTERY2 - SIMPLE ASSAULT", LL: [34.0459, -118.2545], victimSex: "M", victimAge: 20 },
    { cid: "103044682", time: "2232", location: "11003 W 392TH PL", crimeType: "BATTERY3 - SIMPLE ASSAULT", LL: [33.9739, -118.263], victimSex: "M", victimAge: 21 },
    { cid: "103044683", time: "2233", location: "11004 W 393TH PL", crimeType: "BATTERY4 - SIMPLE ASSAULT", LL: [34.1685, -118.4019], victimSex: "F", victimAge: 22 },
    { cid: "103044684", time: "2234", location: "11005 W 395TH PL", crimeType: "BATTERY5 - SIMPLE ASSAULT", LL: [34.2198, -118.4468], victimSex: "M", victimAge: 26 },
    { cid: "103044685", time: "2235", location: "11006 W 396TH PL", crimeType: "BATTERY6 - SIMPLE ASSAULT", LL: [34.0452, -118.2534], victimSex: "F", victimAge: 47 },
    { cid: "103044686", time: "2236", location: "11007 W 397TH PL", crimeType: "BATTERY7 - SIMPLE ASSAULT", LL: [34.0483, -118.2631], victimSex: "M", victimAge: 30 },
    { cid: "103044687", time: "2237", location: "11008 W 398TH PL", crimeType: "BATTERY8 - SIMPLE ASSAULT", LL: [34.0448, -118.2474], victimSex: "X", victimAge: 43 },
    { cid: "103044688", time: "2238", location: "11009 W 399TH PL", crimeType: "BATTERY9 - SIMPLE ASSAULT", LL: [34.0677, -118.2398], victimSex: "M", victimAge: 32 },
    { cid: "103044689", time: "2239", location: "11000 W 390TH PL", crimeType: "BATTERY0 - SIMPLE ASSAULT", LL: [33.9019, -118.2916], victimSex: "F", victimAge: 25 }];

    const [startDate, setStartDate] = useState<Date>(new Date(Date.now()))
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now()))
    const [location, setLocation] = useState<string>("")
    const [map, setMap] = useState<any>()
    const [crimeList, setCrimeList] = useState<any>(crimes)
    const [crimeType, setCrimeType] = useState<string>("UNKNOW")
    const [open, setOpen] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);
    const [newCrime, setNewCrime] = useState<any>([])
    const [address, setAddress] = useState<any>([])
    const [latlng, setLatlng] = useState<any>()

    //fetch data from backend using api
    const fetchData = function (startDate: Date, endDate: Date, location: string, crimeType: string): void {
        alert("start Date: " + startDate + "\nend date: " + endDate + "\nlocation: " + location + "\ncrimt type: " + crimeType)
    }

    //crime marker react component. This will create a record in the table with a corresponding marker in the map
    function CrimeItem({ map, record }: any) {
        const markerInfo = `<p>Date: ${record.time} <br> Type: ${record.crimeType} <br> Address: ${record.location} <br> Victim Sex: ${record.victimSex}    Vitctim Age: ${record.victimAge}</p>`
        const marker = L.marker(record.LL).bindPopup(markerInfo)
        marker.addTo(map);

        const onClick = () => {
            map.flyTo(record.LL, 16);
            marker.openPopup()
        }

        // const editRecord = () => {
        //     record.cid = "1030446790"
        //     record.crimeType = "aaaaaa"
        //     setEdit(true)
        // }

        return (
            // <div className='crime-record-wrapper'>
                <button onClick={onClick} className='crime-record-container'>
                    <div className='crime-record-context record'>{record.cid}</div>
                    <div className='crime-record-context time'>{record.time}</div>
                    <div className='crime-record-context location'>{record.location}</div>
                    <div className='crime-record-context crime'>{record.crimeType}</div>
                </button>
                // <button onClick={editRecord} > edit</button>
            //</div> 

        );
    }

    function CreateMarker() {
        useMapEvents({
            click: async (e) => {
                setLatlng([e.latlng.lat, e.latlng.lng])
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.latlng.lat}&lon=${e.latlng.lng}`);
                setAddress(await response.json())
                setOpen(true);
            }
        })
        return null
    }

    useEffect(() => {
        if (update === true) {
            setCrimeList([...crimeList, newCrime])
            setUpdate(false)
        }
    }, [update])

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

                    <CrimeSelector setCrimeType={setCrimeType} />
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
                        crimeList.map((crime: any, id: number) => {
                            return map ? <CrimeItem key={id} map={map} record={crime}/> : <div key={id}></div>
                        })
                    }
                </div>
            </div>

            <div className='crime-map-container'>
                {
                    useMemo(() => (
                        <MapContainer
                            className="crime-map"
                            center={[34.0141, -118.2978]}
                            zoom={15}
                            scrollWheelZoom={false}
                            ref={setMap}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <CreateMarker />
                        </MapContainer>
                    ),
                        [],
                    )
                }
            </div>
            <Modal className="modal" isOpen={open} onClose={() => { setOpen(false); setUpdate(false) }} update={setUpdate} newCrime={setNewCrime} address={address} ll={latlng} />

        </div>
    )
}

export default CrimeData