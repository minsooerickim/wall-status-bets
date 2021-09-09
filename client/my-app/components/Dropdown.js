import React, { useState } from 'react'

export default function Dropdown() {    
    const [selectedClient,setSelectedClient] = useState([]);

    function handleSelectChange(event) {
        setSelectedClient(event.target.value);
    }
    return(
        <select id="dropDown" value={selectedClient} onChange={handleSelectChange}>
            <option value="day">day</option>
            <option value="day">week</option>
            <option value="day">month</option>
            <option value="day">year</option>
        </select>
    )
}