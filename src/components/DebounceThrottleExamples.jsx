import React, { useState, useEffect, useCallback } from 'react';

const DebounceThrottleExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 Debouncing & Throttling Overview</h3>
      <p>Debouncing delays execution until after a pause, throttling limits execution to once per time period. Both optimize performance for frequent events.</p>
      <div className="code-block">
{`// Debounce: Wait for pause in events
const debouncedFunction = debounce(callback, delay);

// Throttle: Execute once per time period
const throttledFunction = throttle(callback, delay);

// JavaScript Concepts:
// 1. setTimeout/clearTimeout - Timing control
// 2. useCallback - Memoizing functions
// 3. useEffect - Managing side effects
// 4. Event handling - Input, scroll, resize`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: Debounced Search Input</h3>
      <DebouncedSearch />
    </div>
    <div className="example">
      <h3>Example 2: Throttled Scroll Events</h3>
      <ThrottledScroll />
    </div>
    <div className="example">
      <h3>Example 3: Debounced Button Clicks</h3>
      <DebouncedButton />
    </div>
    <div className="example">
      <h3>Example 4: Throttled Window Resize</h3>
      <ThrottledResize />
    </div>
    <div className="example">
      <h3>Example 5: Custom Hook Implementation</h3>
      <CustomHookExample />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Debouncing & Throttling:</h3>
      <ul>
        <li><strong>setTimeout/clearTimeout:</strong> Timing control</li>
        <li><strong>useCallback:</strong> Memoizing functions</li>
        <li><strong>useEffect:</strong> Managing side effects</li>
        <li><strong>Event handling:</strong> Input, scroll, resize</li>
        <li><strong>Closures:</strong> Capturing variables in functions</li>
        <li><strong>Function composition:</strong> Combining functions</li>
      </ul>
    </div>
  </div>
);

// Custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Custom throttle hook
function useThrottle(callback, delay) {
  const lastRun = React.useRef(Date.now());

  return useCallback(() => {
    if (Date.now() - lastRun.current >= delay) {
      callback();
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
}

function DebouncedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Simulate API call
      const results = [
        `Result for: ${debouncedSearchTerm}`,
        `Another result for: ${debouncedSearchTerm}`,
        `Third result for: ${debouncedSearchTerm}`
      ];
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search (debounced by 500ms)..."
        className="input"
      />
      <p>Current input: {searchTerm}</p>
      <p>Debounced input: {debouncedSearchTerm}</p>
      <div>
        {searchResults.map((result, index) => (
          <p key={index} style={{ color: '#27ae60' }}>{result}</p>
        ))}
      </div>
    </div>
  );
}

function ThrottledScroll() {
  const [scrollCount, setScrollCount] = useState(0);
  const [throttledCount, setThrottledCount] = useState(0);

  const throttledScrollHandler = useThrottle(() => {
    setThrottledCount(prev => prev + 1);
  }, 1000);

  useEffect(() => {
    const handleScroll = () => {
      setScrollCount(prev => prev + 1);
      throttledScrollHandler();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttledScrollHandler]);

  return (
    <div style={{ height: '200px', overflow: 'auto', border: '1px solid #ddd', padding: '1rem' }}>
      <h4>Scroll Events</h4>
      <p>Total scroll events: {scrollCount}</p>
      <p>Throttled events (1 per second): {throttledCount}</p>
      <div style={{ height: '1000px', background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)' }}>
        Scroll this content to see throttling in action...
      </div>
    </div>
  );
}

function DebouncedButton() {
  const [clickCount, setClickCount] = useState(0);
  const [debouncedCount, setDebouncedCount] = useState(0);

  const debouncedClick = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedCount(prev => prev + 1);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    debouncedClick();
  };

  return (
    <div>
      <button onClick={handleClick} className="button">
        Click me rapidly!
      </button>
      <p>Total clicks: {clickCount}</p>
      <p>Debounced clicks (1 second delay): {debouncedCount}</p>
    </div>
  );
}

function ThrottledResize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [resizeCount, setResizeCount] = useState(0);

  const throttledResizeHandler = useThrottle(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
    setResizeCount(prev => prev + 1);
  }, 500);

  useEffect(() => {
    const handleResize = () => {
      throttledResizeHandler();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [throttledResizeHandler]);

  return (
    <div>
      <h4>Window Resize (Throttled)</h4>
      <p>Window size: {windowSize.width} x {windowSize.height}</p>
      <p>Resize events processed: {resizeCount}</p>
      <p>Try resizing your browser window to see throttling in action!</p>
    </div>
  );
}

function CustomHookExample() {
  const [input, setInput] = useState('');
  const [apiCalls, setApiCalls] = useState(0);
  const debouncedInput = useDebounce(input, 300);

  const throttledApiCall = useThrottle(() => {
    setApiCalls(prev => prev + 1);
    console.log('API call made for:', debouncedInput);
  }, 1000);

  useEffect(() => {
    if (debouncedInput) {
      throttledApiCall();
    }
  }, [debouncedInput, throttledApiCall]);

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type to trigger debounced + throttled API calls..."
        className="input"
      />
      <p>Current input: {input}</p>
      <p>Debounced input: {debouncedInput}</p>
      <p>API calls made: {apiCalls}</p>
    </div>
  );
}

export default DebounceThrottleExamples; 