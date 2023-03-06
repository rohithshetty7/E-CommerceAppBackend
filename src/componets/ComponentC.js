import React, { useContext } from "react";
import { countContext } from "../App";
function ComponentC() {
  const value = useContext(countContext);
  return (
    <div>
      ComponentC-{value.countState}
      <button onClick={()=>value.countDispatch("increment")}>Increment</button>
      <button onClick={()=>value.countDispatch("decrement")}>Decement</button>
      <button onClick={()=>value.countDispatch("reset")}>Reset</button>

      {/* <ComponentC/> */}
    </div>
  );
}

export default ComponentC;
