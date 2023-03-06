import React, { useReducer } from "react";
const initialValue = {
  firstValue: 1,
  secondValue: 10,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { ...state, firstValue: state.firstValue + action.value };
    case "decrement":
      return { ...state, firstValue: state.firstValue - action.value };
    case "increment2":
      return { ...state, secondValue: state.secondValue + action.value };
    case "decrement2":
      return { ...state, secondValue: state.secondValue - action.value };
    case "reset":
      return initialValue;
    default:
      return state;
  }
};
function UseReducer2() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <div>
      <div>First Count-{state.firstValue}</div>
      <div>Second Count-{state.secondValue}</div>

      <div>
        <button onClick={() => dispatch({ type: "increment", value: 1 })}>
          Increment
        </button>
        <button onClick={() => dispatch({ type: "decrement", value: 1 })}>
          Decrement
        </button>
        <button onClick={() => dispatch({ type: "increment", value: 5 })}>
          Increment-5
        </button>
        <button onClick={() => dispatch({ type: "decrement", value: 5 })}>
          Decrement-5
        </button>
        <button onClick={() => dispatch({ type: "increment2", value: 1 })}>
          Increment count-2
        </button>
        <button onClick={() => dispatch({ type: "decrement2", value: 1 })}>
          Decrement Count-2
        </button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}

export default UseReducer2;
