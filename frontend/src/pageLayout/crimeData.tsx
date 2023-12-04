import { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import './crimeData.css'
import Modal from "../modal/modal";
import L from 'leaflet';
import CrimeSelector from '../component/crimeSelector';
import DeleteModal from '../modal/deleteModal';
import EditModal from '../modal/editModal';
function CrimeData() {
    /* crime structure  { 
                            recordID: "103044679", 
                            DateOcc: "2230", 
                            Location: "1101 W 39TH PL", 
                            CrimeTypeDesc: "BATTERY1 - SIMPLE ASSAULT", 
                            Lat: 34.0141, 
                            Lng: -118.2978, 
                            victimSex: "M", 
                            victimAge: 20 
                        };
    */

    // map ref for the leaflet map
    const [map, setMap] = useState<any>()

    // form data
    const [startDate, setStartDate] = useState<Date>(new Date("2020-01-01"))
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now()))
    const [location, setLocation] = useState<string>("")
    const [crimeType, setCrimeType] = useState<string>("")
    const [newCrime, setNewCrime] = useState<any>([])
    const [address, setAddress] = useState<any>([])
    const [latlng, setLatlng] = useState<any>()

    //crime list for the table
    const [crimeList, setCrimeList] = useState<any>([])
    //control of open the new record form
    const [open, setOpen] = useState<boolean>(false);
    //keep track of the page when fetch
    const [page, setPage] = useState<number>(1)
    //control of adding/fetching more data to the table
    const [onAdd, setOnAdd] = useState<boolean>(false);
    //control the if the MORE is show up in the end of the table
    const [isVisible, setIsVisible] = useState(false);
    //control the deleteFunction and deletedID
    const [outDeleted, setOutDeleted] = useState<boolean>(false);
    const [deleteId, setdeleteId] = useState<string>("");
    
    const [outEdit,setOutEdit] = useState<boolean>(false);
    const [editedCrime, setEditedCrime] = useState<{}>({});
    const [editIndex, setEditIndex] = useState<number>();

    //fetch data from backend using api
    const fetchData = async function (startDate: Date, endDate: Date, location: string, crimeType: string): Promise<void> {
        let url = `http://35.209.203.48/record?FromDate='${startDate.toISOString().split('T')[0]}'&ToDate='${endDate.toISOString().split('T')[0]}'`

        if (location !== "") {
            url += `&Location=${location}`
        }

        if (crimeType !== "") {
            url += `&CrimeType=${crimeType}`
        }

        setPage(2)
        const res = await axios.get(url);
        setCrimeList(res.data.data)
        if (res.data.data.length === 20) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const moreData = async function (startDate: Date, endDate: Date, location: string, crimeType: string): Promise<void> {
        let url = `http://35.209.203.48/record?FromDate='${startDate.toISOString().split('T')[0]}'&ToDate='${endDate.toISOString().split('T')[0]}'`

        if (location !== "") {
            url += `&Location=${location}`
        }

        if (crimeType !== "") {
            url += `&CrimeType=${crimeType}`
        }
        url += `&Page=${page}`

        const res = await axios.get(url);
        const newCrime = res.data.data
        setPage(prev => prev + 1)
        setCrimeList([...crimeList, ...newCrime])
    }
    //crime marker react component. This will create a record in the table with a corresponding marker in the map
    function CrimeItem({ map, record,index }: any) {
        const [openDelete,setOpenDelete] = useState<boolean>(false);
        const [openEdit,setOpenEdit] = useState<boolean>(false);
        const markerInfo = `<p>Date: ${record.DateOcc.split("T")[0]} <br> Type: ${record.CrimeTypeDesc} <br> Address: ${record.Location}</p>`// <br> Victim Sex: ${record.victimSex}    Vitctim Age: ${record.victimAge}</p>`
        const ll: L.LatLngExpression = [Number(record.Latitude), Number(record.Longitude)]
        const marker = L.circleMarker(ll).bindPopup(markerInfo)
        marker.addTo(map);
        const onClick = () => {
            map.flyTo([record.Latitude, record.Longitude], 16);
            marker.openPopup()
        }

        return (
            <div className='crime-record-container-container'>
                <div className='crime-record-context record'>
                    <button onClick={() => {setOpenEdit(true)}} > edit </button>
                    <button onClick={() => setOpenDelete(true)} > delete</button>
                </div>
                <button onClick={onClick} className='crime-record-container'>
                    <div className='crime-record-context time'>{record.DateOcc.split("T")[0]}</div>
                    <div className='crime-record-context location'>{record.Location}</div>
                    <div className='crime-record-context crime'>{record.CrimeTypeDesc}</div>
                </button>
                <EditModal isOpen={openEdit} onClose={() => { setOpenEdit(false); setOutEdit(false) }} setOutEdit={setOutEdit} crime={record} setEditedCrime={setEditedCrime} setEditIndex={()=>setEditIndex(index)}/>
                <DeleteModal isOpen={openDelete} onClose={() => { setOpenDelete(false); setOutDeleted(false) }} setOutDeleted={setOutDeleted} crime={record} setDID={setdeleteId}/>
            </div>
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
        if (onAdd === true) {
            setCrimeList([...crimeList, newCrime])
            setOnAdd(false)
        }

        if (outDeleted === true) {
            setCrimeList(crimeList.filter((crime: { RecordId: string; }) => crime.RecordId !== deleteId));
            setOutDeleted(false)
        }
        
        if (outEdit === true) {
            console.log(editIndex)
            setCrimeList(crimeList.map((item:any,index:number) => {
                if(index === editIndex) {
                    console.log(editedCrime)
                    return editedCrime 
                }
                return item
            }))
            setOutEdit(false)
        }
    }, [onAdd,outDeleted,outEdit])
    
    return (

        <div className="page1-container">

            <div className='crime-table-container'>
                <div className='filter-container'>
                    <div className='filter-container-wrapper'>
                        <label htmlFor="start-date" className='filter'> From : </label>
                        <input type="date" id="start-date" className='filter' onChange={(event) => { setStartDate(new Date(event.target.value)) }} value={startDate.toISOString().split('T')[0]} min="2010-01-01" max="2023-12-31" />
                        <label htmlFor="end-date" className='filter'> To : </label>
                        <input type="date" id="end-date" className='filter' onChange={(event) => { setEndDate(new Date(event.target.value)) }} value={endDate.toISOString().split('T')[0]} min={startDate.toISOString().split('T')[0]} max="2023-12-31" />
                        <label htmlFor="filter-location" className='filter'> Location : </label>
                        <input type="text" id="filter-location" className='filter' onChange={(event) => { setLocation(event.target.value) }} placeholder={"location"} />
                        <CrimeSelector first={"ALL"} setCrimeType={setCrimeType} />
                    </div>

                    <button className='filter filter-search' onClick={() => fetchData(startDate, endDate, location, crimeType)}><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className='crime-title-container'>
                    <div className='crime-record title record'>Action</div>
                    <div className='crime-record title time'>Time Occur</div>
                    <div className='crime-record title location'>Location</div>
                    <div className='crime-record title crime'>Crime Type</div>
                </div>
                <div className='crime-record-box'>
                    {
                        crimeList.map((crime: any, id: number) => {
                            return map ? <CrimeItem key={id} map={map} record={crime} index={id}/> : <div key={id}></div>
                        })
                    }
                    {isVisible && <button className='filter filter-search moreButton-wrapper' onClick={() => moreData(startDate, endDate, location, crimeType)}>More</button>}
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
            <Modal className="modal" isOpen={open} onClose={() => { setOpen(false); setOnAdd(false) }} update={setOnAdd} newCrime={setNewCrime} address={address} ll={latlng} />

        </div>
    )
}

export default CrimeData