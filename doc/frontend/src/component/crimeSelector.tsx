

function CrimeSelector({ setCrimeType }: any) {
    const crimeTypeList = ["one", "two", "three", "four"];
    
    return (
        <div>
        <label htmlFor="filter-crime-type" className='filter'> Crime type: </label>
        <select className='filter' onChange={(event) => setCrimeType(event.target.value)}>
            {
                crimeTypeList.map((crime, id) => {
                    return <option key={id} value={crime}>{crime}</option>
                })
            }
        </select>
        </div>
    )
}

export default CrimeSelector
