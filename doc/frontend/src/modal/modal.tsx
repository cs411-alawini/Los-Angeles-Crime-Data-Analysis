import {useState} from "react";
import "./modal.css"
const Modal = ({ isOpen, onClose, update, newCrime, address, ll }:any) => {
    if (!isOpen) return null;
    const [cid, setCid] = useState<number>(103044691)

    const handleUpdate = async () => {
        await newCrime({ cid: cid, time: "2239", location: address.address.house_number +" "+address.address.road, crimeType: "BATTERY0 - SIMPLE ASSAULT", LL: ll })
        await update(true)
        setCid(prev => prev+1)
        //post function
        
        onClose()
    };
     return (
        <div className="bbbb"> hll
            <div
                style={{
                    background: "white",
                    height: 150,
                    width: 240,
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                }}
            >
                <button className='submit-report' onClick={onClose}><i className="fa-solid fa-magnifying-glass"></i></button>
        
                <button className='submit-report' onClick={() => handleUpdate()}><i className="fa-solid fa-magnifying-glass"></i></button>
        
            </div>
        </div>
    );
};
 
export default Modal;