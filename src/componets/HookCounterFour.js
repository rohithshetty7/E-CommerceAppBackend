import React, { useState } from 'react'

export default function HookCounterFour() {
    const [value, setValue] = useState([])
    const addNumber=()=>{
setValue([...value,{
    id:value.length,
    value:Math.floor(Math.random()*100)+1
}])
    }
  return (
    <div>
<button onClick={addNumber}>Add Number</button>
<h4>{JSON.stringify(value)}</h4>
    <ul>
        {value.map(v=>(
            <li key={v.id}>{v.value}</li>
        ))}
    </ul>
    </div>
  )
}
