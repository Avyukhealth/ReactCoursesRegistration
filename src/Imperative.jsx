// ChildComponent.js
import { forwardRef, useImperativeHandle, useState } from "react";
import { useRef } from "react";

export const ChildComponent = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  
  // Define the method that will be exposed to the parent component
  useImperativeHandle(ref, () => ({
    incrementCount() {
      setCount(count + 1);
    }
  }));

  return (
    <div>
      The current count is: {count}
    </div>
  );
});

// ParentComponent.js
function ParentComponent() {
  const childRef = useRef(null);

  const handleClick = () => {
    childRef.current.incrementCount();
  }

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleClick}>Increment Child Count</button>
    </div>
  );
}
export default ParentComponent;
