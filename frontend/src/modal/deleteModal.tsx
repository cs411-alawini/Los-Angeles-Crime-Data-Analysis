import "./modal.css"
import axios from "axios";

const DeleteModal = ({ isOpen, onClose, setOutDeleted,setDID, crime }: any) => {
    if (!isOpen) return null;

    const handleDelete = async () => {
        await setDID(crime.RecordId)
        await setOutDeleted(true)
        const res = await axios.delete(`http://35.209.203.48/record/${crime.RecordId}`)
        console.log(res)
        onClose()
    };

    return (
        <div className="bbbb">
            <div className="delete-modal-window">
                <div className="modal-header">
                    <h2>Delete Record</h2>
                </div>
                <div className="delete-modal-body">
                    <h3>Delete record {crime.RecordId}</h3>
                </div>
                <div className="delete-button-wrapper">
                    <button className='delete-close-modal' onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
                    <button className='delete-submit-report' onClick={() => {handleDelete()}}>comfirm</button>
                </div>


            </div>
        </div>
    );
};

export default DeleteModal;