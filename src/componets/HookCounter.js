import React, { useState } from "react";

function HookCounter() {
    const [v, setV] = useState(0);
    
    const incFive = () => {

for(let i=0;i<5;i++){
setV(prevCount=>prevCount+1);
}

    };
  return (
    <div>
        {v} <br/>
      <button onClick={()=>setV(prevCount=>prevCount+1)}>Count inc</button>
      <button onClick={()=>setV(prevCount=>prevCount-1)}>Count dec</button>
      <button onClick={()=>setV(0)}>Reset</button>
       <button onClick={incFive}>inc 5</button>

    </div>
  );
}

export default HookCounter;
