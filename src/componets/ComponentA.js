import React, { useContext } from "react";
import ComponentC from "./ComponentC";
import { countContext } from "../App";
function ComponentA() {
  const count = useContext(countContext);
  return (
    <div>
      ComponentA-{count.countState}
      <button onClick={()=>count.countDispatch("increment")}>Increment</button>
      <button onClick={()=>count.countDispatch("decrement")}>Decement</button>
      <button onClick={()=>count.countDispatch("reset")}>Reset</button>

      {/* <ComponentC/> */}
    </div>
  );
}

export default ComponentA;
