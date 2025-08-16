import React, {useEffect, useState} from 'react';

const EventHandlingExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 Event Handling Overview</h3>
      <p>
        React handles events using camelCase syntax and passes a synthetic event object to handlers. You can handle clicks, input, keyboard, mouse, and custom events.
      </p>
      <div className="code-block">
        {`<button onClick={handleClick}>Click Me</button>
<input onChange={handleChange} />
<div onMouseEnter={handleMouseEnter} />
<input onKeyDown={handleKeyDown} />

// JavaScript Concepts:
// 1. Event Objects - e.target, e.type
// 2. Arrow Functions - Inline event handlers
// 3. State Updates - setState in handlers
// 4. Custom Functions - Passing arguments`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: Button Click Event</h3>
      <ButtonClick />
    </div>
    <div className="example">
      <h3>Example 2: Input Change Event</h3>
      <InputChange />
    </div>
    <div className="example">
      <h3>Example 3: Keyboard Event</h3>
      <KeyboardEvent />
    </div>
    <div className="example">
      <h3>Example 4: Mouse Events</h3>
      <MouseEvents />
    </div>
    <div className="example">
      <h3>Example 5: Passing Arguments to Handlers</h3>
      <PassingArguments />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Event Handling:</h3>
      <ul>
        <li><strong>Event Objects:</strong> e.target, e.type, e.key</li>
        <li><strong>Arrow Functions:</strong> Inline and callback handlers</li>
        <li><strong>State Updates:</strong> setState in response to events</li>
        <li>
          <strong>Function Parameters:</strong> Passing arguments to handlers
        </li>
        <li>
          <strong>Conditional Logic:</strong> Handling different event types
        </li>
      </ul>
    </div>
  </div>
);

function ButtonClick () {
  const [count, setCount] = useState (0);
  return (
    <div>
      <button onClick={() => setCount (count + 1)} className="button">
        Clicked {count} times
      </button>
    </div>
  );
}

function InputChange () {
  const [value, setValue] = useState ('');
  return (
    <div>
      <input
        value={value}
        onChange={e => setValue (e.target.value)}
        className="input"
        placeholder="Type here..."
      />
      <p>Value: {value}</p>
    </div>
  );
}

function KeyboardEvent () {
  const [lastKey, setLastKey] = useState ('');
  return (
    <div>
      <input
        onKeyDown={e => setLastKey (e.key)}
        className="input"
        placeholder="Press any key..."
      />
      <p>Last key pressed: {lastKey}</p>
    </div>
  );
}

function MouseEvents () {
  const [hovered, setHovered] = useState (false);
  return (
    <div
      onMouseEnter={() => setHovered (true)}
      onMouseLeave={() => setHovered (false)}
      style={{
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        background: hovered ? '#e8f4fd' : '#fff',
      }}
    >
      {hovered ? 'Mouse is over me!' : 'Hover over this box.'}
    </div>
  );
}

function PassingArguments () {
  const [message, setMessage] = useState ('');
  const showMessage = msg => setMessage (msg);
  return (
    <div>
      <button onClick={() => showMessage ('Hello!')} className="button">
        Say Hello
      </button>
      <button onClick={() => showMessage ('Goodbye!')} className="button">
        Say Goodbye
      </button>
      <p>Message: {message}</p>
    </div>
  );
}

export default EventHandlingExamples;
