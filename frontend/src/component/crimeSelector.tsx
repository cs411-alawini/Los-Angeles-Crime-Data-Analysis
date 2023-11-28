import axios from "axios";
import { useEffect, useState } from "react";


function CrimeSelector({ first , setCrimeType }: any) {
    const [crimeList, setCrimeList] = useState<any>([])
    useEffect( ()=>{
        const fetchCrime = async () => {
            const data = await axios({
                method: 'get',
                url: "http://35.209.203.48/crime",
              })
              setCrimeList(data.data.data)
        }
        fetchCrime()
    },[])
    if(crimeList.length > 0){
        return (
            <div>
            <label htmlFor="filter-crime-type" className='filter'> Crime type : </label>
            <select className='filter filter-crime-type' onChange={(event) => setCrimeType(event.target.value)}>
                <option value={""}>{first}</option>
                {
                    crimeList.map((crime:any,id:any ) => {
                        return <option key={id} value={crime.CrimeTypeDesc}>{crime.CrimeTypeDesc}</option>
                    })
                }
            </select>
            </div>
        )
    }
    
}

export default CrimeSelector
