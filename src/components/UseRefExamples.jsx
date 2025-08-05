import React, { useRef, useState, useEffect } from 'react';

const UseRefExamples = () => {
  return (
    <div>
      <div className="explanation">
        <h3>🎯 useRef Hook Overview</h3>
        <p>
          <strong>useRef</strong> is a React Hook that returns a mutable ref object. 
          It can be used to store a mutable value that doesn't cause re-renders when changed, 
          or to directly access DOM elements.
        </p>
        <div className="code-block">

<p>
  const ref = useRef(initialValue);
  <br />
  <br />
  ---JavaScript Concepts Used:---
  <br />
  ------------------:-------------------
  <br />
  1. Mutable References - Storing references to values or DOM elements
  <br />
  2. DOM Manipulation - Direct access to HTML elements
  <br />
  3. Closures - Functions that remember their scope
  <br />
  4. Event Handling - Managing focus, scroll, and other DOM events
</p>

        </div>
      </div>

      {/* Example 1: Basic useRef for storing values */}
      <div className="example">
        <h3>Example 1: useRef for Storing Values (No Re-renders)</h3>
        <p>Using useRef to store a value that persists across renders without causing re-renders.</p>
        <ValueRef />
        <div className="code-block">
          
{`function ValueRef() {
  const [count, setCount] = useState(0);
  const previousCountRef = useRef(0);
  const renderCountRef = useRef(0);
  
  // This runs on every render but doesn't cause re-renders
  renderCountRef.current = renderCountRef.current + 1;
  
  useEffect(() => {
    previousCountRef.current = count;
  });
  
  return (
    <div>
      <p>Current count: {count}</p>
      <p>Previous count: {previousCountRef.current}</p>
      <p>Component rendered {renderCountRef.current} times</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// JavaScript Concepts:
// - Mutable References: .current property
// - useEffect: Side effects after render
// - State Updates: Triggering re-renders`}
        </div>
      </div>

      {/* Example 2: useRef for DOM element access */}
      <div className="example">
        <h3>Example 2: useRef for DOM Element Access</h3>
        <p>Using useRef to directly access and manipulate DOM elements.</p>
        <DomRef />
        <div className="code-block">
{`function DomRef() {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  const selectText = () => {
    inputRef.current.select();
  };
  
  const getInputInfo = () => {
    const input = inputRef.current;
    console.log('Input value:', input.value);
    console.log('Input type:', input.type);
    console.log('Input placeholder:', input.placeholder);
  };
  

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something here..."
        className="input"
      />
      <button onClick={focusInput}>Focus Input</button>
      <button onClick={selectText}>Select All Text</button>
      <button onClick={getInputInfo}>Log Input Info</button>
    </div>
  );
}

// JavaScript Concepts:
// - DOM API: focus(), select(), value property
// - Console API: console.log() for debugging
// - Event Handling: onClick handlers`}
        </div>
      </div>

      {/* Example 3: useRef for measuring DOM elements */}
      <div className="example">
        <h3>Example 3: useRef for Measuring DOM Elements</h3>
        <p>Using useRef to measure the size and position of DOM elements.</p>
        <MeasureRef />
        <div className="code-block">
{`function MeasureRef() {
  const boxRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const measureElement = () => {
    const element = boxRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      });
      setPosition({
        x: Math.round(rect.left),
        y: Math.round(rect.top)
      });
    }
  };
  
  useEffect(() => {
    measureElement();
    window.addEventListener('resize', measureElement);
    return () => window.removeEventListener('resize', measureElement);
  }, []);
  
  return (
    <div>
      <div
        ref={boxRef}
        style={{
          width: '200px',
          height: '100px',
          backgroundColor: '#3498db',
          color: 'white',
          padding: '20px',
          margin: '20px',
          borderRadius: '8px'
        }}
      >
        Measurable Box
      </div>
      <button onClick={measureElement}>Measure Element</button>
      <p>Width: {dimensions.width}px, Height: {dimensions.height}px</p>
      <p>Position: X={position.x}px, Y={position.y}px</p>
    </div>
  );
}

// JavaScript Concepts:
// - getBoundingClientRect(): Getting element dimensions
// - Math.round(): Rounding numbers
// - Event Listeners: Window resize handling
// - Object Destructuring: Extracting properties`}
        </div>
      </div>

      {/* Example 4: useRef for managing intervals/timeouts */}
      <div className="example">
        <h3>Example 4: useRef for Managing Intervals/Timeouts</h3>
        <p>Using useRef to store and manage timer IDs for cleanup.</p>
        <TimerRef />
        <div className="code-block">
{`function TimerRef() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }
  };
  
  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };
  
  const resetTimer = () => {
    stopTimer();
    setCount(0);
  };
  
  const delayedAlert = () => {
    timeoutRef.current = setTimeout(() => {
      alert('This alert appeared after 3 seconds!');
    }, 3000);
  };
  
  const cancelDelayedAlert = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      alert('Delayed alert cancelled!');
    }
  };
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  
  return (
    <div>
      <h3>Timer: {count} seconds</h3>
      <button onClick={startTimer} disabled={isRunning}>Start Timer</button>
      <button onClick={stopTimer} disabled={!isRunning}>Stop Timer</button>
      <button onClick={resetTimer}>Reset Timer</button>
      <hr />
      <button onClick={delayedAlert}>Set 3s Delayed Alert</button>
      <button onClick={cancelDelayedAlert}>Cancel Delayed Alert</button>
    </div>
  );
}

// JavaScript Concepts:
// - setInterval/setTimeout: Timer functions
// - clearInterval/clearTimeout: Clearing timers
// - Alert API: window.alert() for user notifications
// - Cleanup: Preventing memory leaks`}
        </div>
      </div>

      <div className="js-concept">
        <h3>🔍 Key JavaScript Concepts Used in useRef:</h3>
        <ul>
          <li><strong>Mutable References:</strong> .current property for storing values</li>
          <li><strong>DOM API:</strong> focus(), select(), getBoundingClientRect()</li>
          <li><strong>Timer Functions:</strong> setInterval, setTimeout, clearInterval, clearTimeout</li>
          <li><strong>Event Listeners:</strong> addEventListener, removeEventListener</li>
          <li><strong>Math Functions:</strong> Math.round() for number formatting</li>
          <li><strong>Console API:</strong> console.log() for debugging</li>
          <li><strong>Alert API:</strong> window.alert() for user notifications</li>
          <li><strong>Object Properties:</strong> Accessing and setting object properties</li>
          <li><strong>Conditional Logic:</strong> if statements for element existence checks</li>
          <li><strong>Cleanup Functions:</strong> Preventing memory leaks in useEffect</li>
        </ul>
      </div>
    </div>
  );
};

// Component implementations
function ValueRef() {
  const [count, setCount] = useState(0);
  const previousCountRef = useRef(0);
  const renderCountRef = useRef(0);
  
  // This runs on every render but doesn't cause re-renders
  renderCountRef.current = renderCountRef.current + 1;
  
  useEffect(() => {
    console.log("prev.curr -(before setting ) ", previousCountRef.current)
    console.log("count abhi :=", count);
    previousCountRef.current = count;
    console.log("prev.curr -(after setting ) ", previousCountRef.current)


  });
  
  return (
    <div>
      <p>Current count: <strong>{count}</strong></p>
      <p>Previous count: <strong>{previousCountRef.current}</strong></p>
      <p>Component rendered <strong>{renderCountRef.current}</strong> times</p>
      <button onClick={() => setCount(count + 1)} className="button">Increment</button>
      <button onClick={() => setCount(0)} className="button">Reset</button>
    </div>
  );
}

function DomRef() {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  const selectText = () => {
    inputRef.current.select();
  };
  
  const getInputInfo = () => {
    const input = inputRef.current;
    console.log('Input value:', input.value);
    console.log('Input type:', input.type);
    console.log('Input placeholder:', input.placeholder);
    alert(`Input Info:\nValue: ${input.value}\nType: ${input.type}\nPlaceholder: ${input.placeholder}`);
  };
  
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something here..."
        className="input"
        style={{ width: '300px' }}
      />
      <br />
      <button onClick={focusInput} className="button">Focus Input</button>
      <button onClick={selectText} className="button">Select All Text</button>
      <button onClick={getInputInfo} className="button">Log Input Info</button>
    </div>
  );
}

function MeasureRef() {
  const boxRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const measureElement = () => {
    const element = boxRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      });
      setPosition({
        x: Math.round(rect.left),
        y: Math.round(rect.top)
      });
    }
  };
  
  useEffect(() => {
    measureElement();
    window.addEventListener('resize', measureElement);
    return () => window.removeEventListener('resize', measureElement);
  }, []);
  
  return (
    <div>
      <div
        ref={boxRef}
        style={{
          width: '200px',
          height: '100px',
          backgroundColor: '#3498db',
          color: 'white',
          padding: '20px',
          margin: '20px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        Measurable Box
      </div>
      <button onClick={measureElement} className="button">Measure Element</button>
      <p>Width: <strong>{dimensions.width}px</strong>, Height: <strong>{dimensions.height}px</strong></p>
      <p>Position: X=<strong>{position.x}px</strong>, Y=<strong>{position.y}px</strong></p>
    </div>
  );
}

function TimerRef() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }
  };
  
  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };
  
  const resetTimer = () => {
    stopTimer();
    setCount(0);
  };
  
  const delayedAlert = () => {
    timeoutRef.current = setTimeout(() => {
      alert('This alert appeared after 3 seconds!');
    }, 3000);
  };
  
  const cancelDelayedAlert = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      alert('Delayed alert cancelled!');
    }
  };
  
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  
  return (
    <div>
      <h3>Timer: <strong>{count}</strong> seconds</h3>
      <button onClick={startTimer} disabled={isRunning} className="button">Start Timer</button>
      <button onClick={stopTimer} disabled={!isRunning} className="button">Stop Timer</button>
      <button onClick={resetTimer} className="button">Reset Timer</button>
      <hr style={{ margin: '20px 0' }} />
      <button onClick={delayedAlert} className="button">Set 3s Delayed Alert</button>
      <button onClick={cancelDelayedAlert} className="button">Cancel Delayed Alert</button>
    </div>
  );
}

export default UseRefExamples; 