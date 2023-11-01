import './crimeData.css'
function CrimeData() {
    const crimeList = [ { cid: "10304468", time: "2230", location: "1100 W 39TH PL", crimeType: "BATTERY - SIMPLE ASSAULT" },
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
    return (
        <div className="page1-container">
            <div className='crime-table-container'>
                <div className='filter-container'></div>
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

            </div>
        </div>
    )
}

export default CrimeData