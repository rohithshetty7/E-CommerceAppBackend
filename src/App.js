import logo from "./logo.svg";
import "./App.css";
import Hook1 from "./componets/hook1";
import HookCounter from "./componets/HookCounter";
import HookCounterThree from "./componets/HookCounterThree";
import HookCounterFour from "./componets/HookCounterFour";
import HookMouse from "./componets/HookMouse";
import AllignItem from "./componets/AllignItem";
import HookCounterOne from "./componets/HookCounterOne";
import MouseCountainer from "./componets/MouseCountainer";
import IntervalCounter from "./componets/IntervalCounter";
import DataFetching from "./componets/DataFetching";
import Component1 from "./componets/context/Component1";
import React, { useReducer } from "react";
import UseReducer from "./componets/UseReducer";
import UseReducer2 from "./componets/UseReducer2";
import UseReducer3 from "./componets/UseReducer3";
import ComponentA from "./componets/ComponentA";
import ComponentB from "./componets/ComponentB";
import ComponentC from "./componets/ComponentC";

export const userContext = React.createContext();
export const channelContext = React.createContext();
export const countContext = React.createContext();
const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return initialState;
    default:
      return state;
  }
};
function App() {
  const [count,dispatch]=useReducer(reducer,initialState)

  return (
      <countContext.Provider value={{countState:count,countDispatch:dispatch}}>
    <div className="App">
      {/* Count-{count} */}
      {/* <userContext.Provider value={"Rohith "} >
        <channelContext.Provider value={"Atma"}>

        <Component1 />
        </channelContext.Provider>
      </userContext.Provider> */}
      {/* <UseReducer3/> */}
        {/* <ComponentA />
        <ComponentB />
        <ComponentC /> */}
        <UseReducer2/>
    </div>
      </countContext.Provider>
  );
}

export default App;
