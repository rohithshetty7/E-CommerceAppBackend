import React, { useContext } from "react";
import ComponentC from "./ComponentC";
import { countContext } from "../App";
function ComponentB() {
  const value = useContext(countContext);
  return (
    <div>
      ComponentB-{value.countState}
      <button onClick={()=>value.countDispatch("increment")}>Increment</button>
      <button onClick={()=>value.countDispatch("decrement")}>Decement</button>
      <button onClick={()=>value.countDispatch("reset")}>Reset</button>

      {/* <ComponentC/> */}
    </div>
  );
}

export default ComponentB;
