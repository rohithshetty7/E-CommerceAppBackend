import React, { useEffect, useState } from "react";

function HookMouse() {
  const [x, setx] = useState(0);
  const [y, setY] = useState(0);

  const logMousePosition = (e) => {
    console.log("Mouse event");
    setx(e.clientX);
    setY(e.clientX);
  };
  useEffect(() => {
    console.log("USeEffect Called");
    window.addEventListener("mousemove", logMousePosition);
    return () => {
      console.log("Component unmount code");
      window.removeEventListener("mousemove", logMousePosition);
    };
  }, []);

  return (
    <div>
      Hook x-{x}; Hook y-{y};
    </div>
  );
}

export default HookMouse;
