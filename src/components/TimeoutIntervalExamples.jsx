import React, { useState, useEffect, useRef } from 'react';

const TimeoutIntervalExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 Timeout & Interval Management Overview</h3>
      <p>Managing timeouts and intervals in React with proper cleanup to prevent memory leaks and unexpected behavior.</p>
      <div className="code-block">
{`useEffect(() => {
  const timer = setTimeout(() => {}, 1000);
  const interval = setInterval(() => {}, 1000);
  
  return () => {
    clearTimeout(timer);
    clearInterval(interval);
  };
}, []);

// JavaScript Concepts:
// 1. setTimeout/setInterval - Browser timing APIs
// 2. clearTimeout/clearInterval - Cleanup functions
// 3. useEffect cleanup - Preventing memory leaks
// 4. useRef - Storing timer IDs`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: Basic Timeout</h3>
      <BasicTimeout />
    </div>
    <div className="example">
      <h3>Example 2: Interval Counter</h3>
      <IntervalCounter />
    </div>
    <div className="example">
      <h3>Example 3: Multiple Timers with Cleanup</h3>
      <MultipleTimers />
    </div>
    <div className="example">
      <h3>Example 4: Delayed Actions</h3>
      <DelayedActions />
    </div>
    <div className="example">
      <h3>Example 5: Timer with useRef</h3>
      <TimerWithRef />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Timeouts & Intervals:</h3>
      <ul>
        <li><strong>setTimeout/setInterval:</strong> Browser timing APIs</li>
        <li><strong>clearTimeout/clearInterval:</strong> Cleanup functions</li>
        <li><strong>useEffect cleanup:</strong> Preventing memory leaks</li>
        <li><strong>useRef:</strong> Storing timer IDs</li>
        <li><strong>State Updates:</strong> Updating state after delays</li>
        <li><strong>Conditional Logic:</strong> Starting/stopping timers</li>
      </ul>
    </div>
  </div>
);

function BasicTimeout() {
  const [message, setMessage] = useState('');
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    if (showTimeout) {
      const timer = setTimeout(() => {
        setMessage('Timeout completed after 2 seconds!');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showTimeout]);

  return (
    <div>
      <button onClick={() => setShowTimeout(true)} className="button">
        Start 2 Second Timeout
      </button>
      {message && <p style={{ color: '#27ae60' }}>{message}</p>}
      <button onClick={() => { setShowTimeout(false); setMessage(''); }} className="button">
        Reset
      </button>
    </div>
  );
}

function IntervalCounter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div>
      <h4>Counter: {count}</h4>
      <button onClick={() => setIsRunning(!isRunning)} className="button">
        {isRunning ? 'Stop' : 'Start'} Counter
      </button>
      <button onClick={() => setCount(0)} className="button">Reset</button>
    </div>
  );
}

function MultipleTimers() {
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer1 = setTimeout(() => {
      setMessages(prev => [...prev, 'Timer 1: 1 second passed']);
    }, 1000);

    const timer2 = setTimeout(() => {
      setMessages(prev => [...prev, 'Timer 2: 2 seconds passed']);
    }, 2000);

    const timer3 = setTimeout(() => {
      setMessages(prev => [...prev, 'Timer 3: 3 seconds passed']);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isActive]);

  return (
    <div>
      <button onClick={() => setIsActive(!isActive)} className="button">
        {isActive ? 'Stop' : 'Start'} Multiple Timers
      </button>
      <button onClick={() => setMessages([])} className="button">Clear Messages</button>
      <div style={{ marginTop: '1rem' }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ color: '#3498db' }}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

function DelayedActions() {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
        className="input"
      />
      <p>Current input: {input}</p>
      <p>Debounced input (500ms delay): {debouncedInput}</p>
    </div>
  );
}

function TimerWithRef() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) return; // Prevent multiple timers
    
    timerRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setCount(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h4>Count: {count}</h4>
      <button onClick={startTimer} className="button">Start</button>
      <button onClick={stopTimer} className="button">Stop</button>
      <button onClick={resetTimer} className="button">Reset</button>
    </div>
  );
}

export default TimeoutIntervalExamples; 