import React, { useState } from 'react';

const ConditionalRenderingExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 Conditional Rendering Overview</h3>
      <p>React supports conditional rendering using if/else, ternary, &&, switch, and enums. Show/hide UI based on state or props.</p>
      <div className="code-block">
{`{isLoggedIn ? <Dashboard /> : <Login />}
{count > 0 && <p>Count is positive</p>}
{status === 'loading' ? <Spinner /> : <Content />}

// JavaScript Concepts:
// 1. Ternary Operators - condition ? a : b
// 2. Logical && - condition && value
// 3. Switch Statements - Multiple cases
// 4. Enums/Constants - Status values`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: Ternary Operator</h3>
      <TernaryExample />
    </div>
    <div className="example">
      <h3>Example 2: Logical && Operator</h3>
      <LogicalAndExample />
    </div>
    <div className="example">
      <h3>Example 3: Switch Statement</h3>
      <SwitchExample />
    </div>
    <div className="example">
      <h3>Example 4: Enum/Constant Status</h3>
      <EnumExample />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Conditional Rendering:</h3>
      <ul>
        <li><strong>Ternary Operators:</strong> condition ? value1 : value2</li>
        <li><strong>Logical &&:</strong> condition && value</li>
        <li><strong>Switch Statements:</strong> Multiple cases for rendering</li>
        <li><strong>Enums/Constants:</strong> Using constants for status</li>
        <li><strong>State/Props:</strong> Controlling UI with state/props</li>
      </ul>
    </div>
  </div>
);

function TernaryExample() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)} className="button">
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  );
}

function LogicalAndExample() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)} className="button">Increment</button>
      {count > 0 && <p>Count is positive: {count}</p>}
    </div>
  );
}

function SwitchExample() {
  const [status, setStatus] = useState('idle');
  let content;
  switch (status) {
    case 'loading':
      content = <p>Loading...</p>;
      break;
    case 'success':
      content = <p>Data loaded successfully!</p>;
      break;
    case 'error':
      content = <p style={{ color: '#e74c3c' }}>Error loading data.</p>;
      break;
    default:
      content = <p>Idle state.</p>;
  }
  return (
    <div>
      {content}
      <div>
        <button onClick={() => setStatus('idle')} className="button">Idle</button>
        <button onClick={() => setStatus('loading')} className="button">Loading</button>
        <button onClick={() => setStatus('success')} className="button">Success</button>
        <button onClick={() => setStatus('error')} className="button">Error</button>
      </div>
    </div>
  );
}

function EnumExample() {
  const Status = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
  };
  const [status, setStatus] = useState(Status.IDLE);
  return (
    <div>
      <p>Status: {status}</p>
      {status === Status.LOADING && <p>Loading spinner...</p>}
      {status === Status.SUCCESS && <p>🎉 Success!</p>}
      {status === Status.ERROR && <p style={{ color: '#e74c3c' }}>❌ Error occurred.</p>}
      <div>
        {Object.values(Status).map(s => (
          <button key={s} onClick={() => setStatus(s)} className="button">{s}</button>
        ))}
      </div>
    </div>
  );
}

export default ConditionalRenderingExamples; 