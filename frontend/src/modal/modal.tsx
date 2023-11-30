import { useState } from "react";
import "./modal.css"
import CrimeSelector from "../component/crimeSelector";
import axios from "axios";

const Modal = ({ isOpen, onClose, update, newCrime, address, ll }: any) => {
    if (!isOpen) return null;

    var loc = ""
    if (address.address.house_number != undefined) {
        loc = address.address.house_number + " " + address.address.road
    } else {
        loc = address.address.road
    }
    const today = new Date(Date.now())
    const [location, setLocation] = useState<string>(loc)
    const [occurDate, SetOccurDate] = useState<Date>(new Date(Date.now()))
    const [crimeType, setCrimeType] = useState<string>("UNKNOW")
    const [vSex, setVSex] = useState<string>('X')
    const [vAge, setVAge] = useState<number>(0)
    const [detail, setDetail] = useState<string>("")

    const handleUpdate = async () => {
        const crimeTemp = { DateOcc: occurDate.toISOString().split('T')[0], 
                            Location: location, 
                            CrimeType: crimeType, 
                            Lat: ll[0], 
                            Lng: ll[1], 
                            VictimSex: vSex, 
                            VictimAge: vAge }
        const crime = { RecordId: 123, DateOcc: occurDate.toISOString().split('T')[0], Location: location, CrimeTypeDesc: crimeType, Latitude: ll[0], Longitude: ll[1], detail: detail }
        await newCrime(crime)
        await update(true)
        const res = await axios.post('http://35.209.203.48/record', crimeTemp)
        console.log(res)
        onClose()
    };

    return (
        <div className="bbbb">
            <div className="modal-window">
                <div className="modal-header">
                    <h2>Record Form</h2>
                    <button className='close-modal' onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="modal-body">
                    <div className="modal-body-line">
                        <label htmlFor="modal-occurDate" className='filter'> Occur Date : </label>
                        <input type="date" id="modal-occurDate" className='filter' onChange={(event) => { SetOccurDate(new Date(event.target.value)) }} value={occurDate.toISOString().split('T')[0]} max={today.toISOString().split('T')[0]} />
                        
                    </div>
                    <div className="modal-body-line">
                        <CrimeSelector first={"UNKNOW"} setCrimeType={setCrimeType} />
                    </div>
                    <div className="modal-body-line">
                        <label htmlFor="modal-location" className='filter' > Location : </label>
                        <input type="text" id="modal-location" className='filter' onChange={(event) => { setLocation(event.target.value) }} placeholder={location} value={location}/>
                    </div>

                    <div className="modal-body-line">
                        <label htmlFor="victim-age" className='filter'>Victim Age: </label>
                        <input type="number" id="victim-age" onChange={(e)=>{setVAge(Number(e.target.value))}} className='filter' min="0" max="100" defaultValue={0}/>
                        <label htmlFor="victim-sex" className='filter'> Victim Sex: </label>
                        <select className='filter' onChange={(event) => setVSex(event.target.value)}>
                            <option value="X">UNKNOW</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </div>

                    <div className="modal-body-line modal-description">
                        <label htmlFor="modal-description" className='filter'> Description : </label>
                        <textarea id="modal-description"  placeholder={"Detail"} onChange={(event) => setDetail(event.target.value)}/>
                    </div>
                </div>
                <button className='submit-report' onClick={() => handleUpdate()}>Sumbit</button>

            </div>
        </div>
    );
};

export default Modal;