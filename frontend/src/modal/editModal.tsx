import { useState } from "react";
import CrimeSelector from "../component/crimeSelector";
import "./modal.css"
import axios from "axios";

const EditModal = ({ isOpen, onClose, setOutEdit, setEditedCrime, crime, setEditIndex }: any) => {
    if (!isOpen) return null;

    const today = new Date(Date.now())
    const [location, setLocation] = useState<string>(crime.Location)
    const [occurDate, SetOccurDate] = useState<Date>(new Date(crime.DateOcc))
    const [crimeType, setCrimeType] = useState<string>(crime.CrimeTypeDesc)

    const handleEdit = async () => {
        await setEditIndex()
        const editedCrime = {
            CrimeTypeDesc: crimeType,
            DateOcc: occurDate.toISOString().split('T')[0],
            Location: location,
            Latitude: crime.Latitude,
            Longitude: crime.Longitude,
            TimeOcc: crime.TimeOcc,
            Part: crime.Part,
            PremiseId: crime.PremiseId,
            RecordId: crime.RecordId,
            UserName: crime.UserName,
            VictimId: crime.VictimId,
            WeaponId: crime.WeaponId
        }
        await setEditedCrime(editedCrime)
        await setOutEdit(true)
        const editTemp = {
            CrimeTypeDesc: crimeType,
            DateOcc: occurDate.toISOString().split('T')[0],
            Location: location
        }
        console.log(`http://35.209.7.162/record/${crime.RecordId}`)
        const res = await axios.put(`http://35.209.7.162/record/${crime.RecordId}`, editTemp)
        console.log(res)
        onClose()
    };

    return (
        <div className="bbbb">
            <div className="edit-modal-window">
                <div className="modal-header">
                    <h2>Record Form</h2>
                </div>
                <div className="edit-modal-body">
                    <div className="modal-body-line">
                        <label htmlFor="modal-occurDate" className='filter'> Occur Date : </label>
                        <input type="date" id="modal-occurDate" className='filter' onChange={(event) => { SetOccurDate(new Date(event.target.value)) }} value={occurDate.toISOString().split('T')[0]} max={today.toISOString().split('T')[0]} />
                        
                    </div>
                    <div className="modal-body-line">
                        <label htmlFor="modal-location" className='filter'> Location : </label>
                        <input type="text" id="modal-location" className='filter' onChange={(event) => { setLocation(event.target.value) }} placeholder={location} value={location}/>
                    </div>
                    
                    <div className="modal-body-line">
                        <CrimeSelector first={"UNKNOW"} setCrimeType={setCrimeType} value={crime.CrimeTypeDesc}/>
                    </div>
                </div>
                
                <div className="delete-button-wrapper">
                    <button className='edit-close-modal' onClick={onClose}> Cancel</button>
                    <button className='edit-submit-report' onClick={() => { handleEdit() }}>Comfirm</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;