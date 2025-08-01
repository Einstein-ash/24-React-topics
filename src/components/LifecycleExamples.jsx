import React, { useState, useEffect } from 'react';

const LifecycleExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 Component Lifecycle Overview</h3>
      <p>React components have a lifecycle: mount, update, and unmount. useEffect can mimic lifecycle methods in function components.</p>
      <div className="code-block">
{`useEffect(() => {
  // Mount (componentDidMount)
  return () => {
    // Unmount (componentWillUnmount)
  };
}, [dependencies]);

// JavaScript Concepts:
// 1. Closures - Accessing variables in effects
// 2. Cleanup Functions - Removing listeners, timers
// 3. Dependency Arrays - Controlling effect runs
// 4. Class vs. Function - Lifecycle methods`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: Mount and Unmount</h3>
      <MountUnmount />
    </div>
    <div className="example">
      <h3>Example 2: Update Effect</h3>
      <UpdateEffect />
    </div>
    <div className="example">
      <h3>Example 3: Cleanup Effect</h3>
      <CleanupEffect />
    </div>
    <div className="example">
      <h3>Example 4: Class vs. Function Lifecycle</h3>
      <ClassVsFunction />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Lifecycle:</h3>
      <ul>
        <li><strong>Closures:</strong> Accessing variables in effects</li>
        <li><strong>Cleanup Functions:</strong> Removing listeners, timers</li>
        <li><strong>Dependency Arrays:</strong> Controlling effect runs</li>
        <li><strong>Class vs. Function:</strong> Lifecycle methods vs. useEffect</li>
      </ul>
    </div>
  </div>
);

function MountUnmount() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(!show)} className="button">{show ? 'Unmount' : 'Mount'} Child</button>
      {show && <Child />}
    </div>
  );
}
function Child() {
  useEffect(() => {
    alert('Mounted!');
    return () => alert('Unmounted!');
  }, []);
  return <div>Child Component</div>;
}

function UpdateEffect() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count > 0) document.title = `Count: ${count}`;
  }, [count]);
  return (
    <div>
      <button onClick={() => setCount(count + 1)} className="button">Increment</button>
      <p>Count: {count}</p>
      <p>Check the browser tab title after incrementing!</p>
    </div>
  );
}

function CleanupEffect() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div>
      <p>Window width: {width}px</p>
      <p>Resize the window to see updates.</p>
    </div>
  );
}

class ClassVsFunction extends React.Component {
  state = { count: 0 };
  componentDidMount() {
    document.title = 'Class: Mounted';
  }
  componentDidUpdate() {
    document.title = `Class: Count ${this.state.count}`;
  }
  componentWillUnmount() {
    document.title = 'Unmounted';
  }
  render() {
    return (
      <div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })} className="button">Increment</button>
        <p>Class Count: {this.state.count}</p>
      </div>
    );
  }
}

export default LifecycleExamples; 