import React, { useState, useEffect, useRef } from 'react';

const PollingExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 Polling & Real-time Updates Overview</h3>
      <p>Implementing polling mechanisms to fetch data at regular intervals, check status updates, and maintain real-time synchronization.</p>
      <div className="code-block">
{`// Basic polling with setInterval
useEffect(() => {
  const interval = setInterval(() => {
    fetchData();
  }, 5000);
  
  return () => clearInterval(interval);
}, []);

// JavaScript Concepts:
// 1. setInterval/clearInterval - Regular execution
// 2. fetch API - Data fetching
// 3. useEffect cleanup - Preventing memory leaks
// 4. State management - Updating data`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: Basic API Polling</h3>
      <BasicAPIPolling />
    </div>
    <div className="example">
      <h3>Example 2: Status Checking</h3>
      <StatusChecking />
    </div>
    <div className="example">
      <h3>Example 3: Real-time Counter</h3>
      <RealTimeCounter />
    </div>
    <div className="example">
      <h3>Example 4: Conditional Polling</h3>
      <ConditionalPolling />
    </div>
    <div className="example">
      <h3>Example 5: Data Synchronization</h3>
      <DataSynchronization />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Polling:</h3>
      <ul>
        <li><strong>setInterval/clearInterval:</strong> Regular execution</li>
        <li><strong>fetch API:</strong> Data fetching</li>
        <li><strong>useEffect cleanup:</strong> Preventing memory leaks</li>
        <li><strong>State management:</strong> Updating data</li>
        <li><strong>Conditional logic:</strong> Starting/stopping polling</li>
        <li><strong>Error handling:</strong> Handling API failures</li>
      </ul>
    </div>
  </div>
);

function BasicAPIPolling() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pollCount, setPollCount] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockData = {
        timestamp: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 100),
        pollCount: pollCount + 1
      };
      
      setData(mockData);
      setPollCount(prev => prev + 1);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();
    
    // Set up polling every 3 seconds
    const interval = setInterval(fetchData, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h4>API Polling (every 3 seconds)</h4>
      {loading && <p style={{ color: '#f39c12' }}>Loading...</p>}
      {error && <p style={{ color: '#e74c3c' }}>{error}</p>}
      {data && (
        <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
          <p><strong>Timestamp:</strong> {data.timestamp}</p>
          <p><strong>Value:</strong> {data.value}</p>
          <p><strong>Poll Count:</strong> {data.pollCount}</p>
        </div>
      )}
    </div>
  );
}

function StatusChecking() {
  const [status, setStatus] = useState('idle');
  const [lastCheck, setLastCheck] = useState(null);
  const [checkCount, setCheckCount] = useState(0);

  const checkStatus = async () => {
    try {
      // Simulate status check
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const statuses = ['idle', 'processing', 'completed', 'failed'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      setStatus(randomStatus);
      setLastCheck(new Date().toLocaleTimeString());
      setCheckCount(prev => prev + 1);
    } catch (err) {
      setStatus('error');
    }
  };

  useEffect(() => {
    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'idle': return '#95a5a6';
      case 'processing': return '#f39c12';
      case 'completed': return '#27ae60';
      case 'failed': return '#e74c3c';
      case 'error': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <div>
      <h4>Status Checking (every 2 seconds)</h4>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: getStatusColor(status),
            display: 'inline-block'
          }}
        />
        <span style={{ fontWeight: 'bold' }}>Status: {status}</span>
      </div>
      <p><strong>Last Check:</strong> {lastCheck || 'Never'}</p>
      <p><strong>Total Checks:</strong> {checkCount}</p>
    </div>
  );
}

function RealTimeCounter() {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [interval, setInterval] = useState(1000);

  useEffect(() => {
    let intervalId;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setCounter(prev => prev + 1);
      }, interval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, interval]);

  const handleIntervalChange = (e) => {
    setInterval(parseInt(e.target.value));
  };

  return (
    <div>
      <h4>Real-time Counter</h4>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>
        {counter}
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Interval (ms): </label>
        <select value={interval} onChange={handleIntervalChange} className="input">
          <option value={100}>100ms</option>
          <option value={500}>500ms</option>
          <option value={1000}>1 second</option>
          <option value={2000}>2 seconds</option>
        </select>
      </div>
      
      <button 
        onClick={() => setIsRunning(!isRunning)} 
        className="button"
        style={{ backgroundColor: isRunning ? '#e74c3c' : '#27ae60' }}
      >
        {isRunning ? 'Stop' : 'Start'} Counter
      </button>
      
      <button onClick={() => setCounter(0)} className="button">Reset</button>
    </div>
  );
}

function ConditionalPolling() {
  const [isPolling, setIsPolling] = useState(false);
  const [data, setData] = useState([]);
  const [threshold, setThreshold] = useState(5);

  const fetchData = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newItem = {
        id: Date.now(),
        value: Math.floor(Math.random() * 100),
        timestamp: new Date().toLocaleTimeString()
      };
      
      setData(prev => [...prev, newItem]);
      
      // Stop polling if we reach the threshold
      if (data.length + 1 >= threshold) {
        setIsPolling(false);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  useEffect(() => {
    let intervalId;
    
    if (isPolling && data.length < threshold) {
      intervalId = setInterval(fetchData, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPolling, data.length, threshold]);

  const startPolling = () => {
    setData([]);
    setIsPolling(true);
  };

  const stopPolling = () => {
    setIsPolling(false);
  };

  return (
    <div>
      <h4>Conditional Polling</h4>
      <p>Polling stops when reaching the threshold</p>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Threshold: </label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(parseInt(e.target.value))}
          min="1"
          max="20"
          className="input"
        />
      </div>
      
      <button 
        onClick={startPolling} 
        disabled={isPolling}
        className="button"
      >
        Start Polling
      </button>
      
      <button 
        onClick={stopPolling} 
        disabled={!isPolling}
        className="button"
      >
        Stop Polling
      </button>
      
      <div style={{ marginTop: '1rem' }}>
        <p><strong>Status:</strong> {isPolling ? 'Polling...' : 'Stopped'}</p>
        <p><strong>Items collected:</strong> {data.length}/{threshold}</p>
        
        <div style={{ maxHeight: '200px', overflow: 'auto', border: '1px solid #ddd', padding: '0.5rem' }}>
          {data.map(item => (
            <div key={item.id} style={{ marginBottom: '0.5rem', padding: '0.5rem', backgroundColor: '#f8f9fa' }}>
              <strong>Value:</strong> {item.value} | <strong>Time:</strong> {item.timestamp}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DataSynchronization() {
  const [localData, setLocalData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [syncStatus, setSyncStatus] = useState('idle');
  const [lastSync, setLastSync] = useState(null);

  const fetchServerData = async () => {
    try {
      setSyncStatus('syncing');
      
      // Simulate server API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockServerData = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        value: Math.floor(Math.random() * 100),
        timestamp: new Date().toLocaleTimeString()
      }));
      
      setServerData(mockServerData);
      setSyncStatus('synced');
      setLastSync(new Date().toLocaleTimeString());
    } catch (err) {
      setSyncStatus('error');
    }
  };

  const addLocalData = () => {
    const newItem = {
      id: Date.now(),
      value: Math.floor(Math.random() * 100),
      timestamp: new Date().toLocaleTimeString(),
      source: 'local'
    };
    setLocalData(prev => [...prev, newItem]);
  };

  useEffect(() => {
    // Initial sync
    fetchServerData();
    
    // Sync every 5 seconds
    const interval = setInterval(fetchServerData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getSyncStatusColor = (status) => {
    switch (status) {
      case 'idle': return '#95a5a6';
      case 'syncing': return '#f39c12';
      case 'synced': return '#27ae60';
      case 'error': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <div>
      <h4>Data Synchronization (every 5 seconds)</h4>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: getSyncStatusColor(syncStatus),
            display: 'inline-block'
          }}
        />
        <span><strong>Sync Status:</strong> {syncStatus}</span>
      </div>
      
      <p><strong>Last Sync:</strong> {lastSync || 'Never'}</p>
      
      <button onClick={addLocalData} className="button">Add Local Data</button>
      <button onClick={fetchServerData} className="button">Manual Sync</button>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div>
          <h5>Local Data ({localData.length})</h5>
          <div style={{ maxHeight: '200px', overflow: 'auto', border: '1px solid #ddd', padding: '0.5rem' }}>
            {localData.map(item => (
              <div key={item.id} style={{ marginBottom: '0.5rem', padding: '0.5rem', backgroundColor: '#e8f4fd' }}>
                <strong>Value:</strong> {item.value} | <strong>Time:</strong> {item.timestamp}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h5>Server Data ({serverData.length})</h5>
          <div style={{ maxHeight: '200px', overflow: 'auto', border: '1px solid #ddd', padding: '0.5rem' }}>
            {serverData.map(item => (
              <div key={item.id} style={{ marginBottom: '0.5rem', padding: '0.5rem', backgroundColor: '#f0f8f0' }}>
                <strong>Value:</strong> {item.value} | <strong>Time:</strong> {item.timestamp}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PollingExamples; 