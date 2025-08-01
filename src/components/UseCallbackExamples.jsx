import React, { useState, useCallback, memo } from 'react';

const UseCallbackExamples = () => {
  return (
    <div>
      <div className="explanation">
        <h3>🎯 useCallback Hook Overview</h3>
        <p>
          <strong>useCallback</strong> is a React Hook that returns a memoized callback function. 
          It only changes when one of its dependencies has changed, which is useful for optimizing 
          performance by preventing unnecessary re-renders of child components that rely on callback props.
        </p>
        <div className="code-block">
{`const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// JavaScript Concepts Used:
// 1. Function Memoization - Caching function references
// 2. Dependency Arrays - Controlling when to recreate functions
// 3. Arrow Functions - Function expressions
// 4. Performance Optimization - Preventing unnecessary re-renders`}
        </div>
      </div>

      {/* Example 1: Basic useCallback with Counter */}
      <div className="example">
        <h3>Example 1: Basic useCallback with Counter</h3>
        <p>Using useCallback to memoize event handlers and prevent unnecessary re-renders.</p>
        <BasicCallback />
        <div className="code-block">
{`function BasicCallback() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  
  // Memoized callback - only recreates when count changes
  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // Empty dependency array - never recreates
  
  const decrementCount = useCallback(() => {
    setCount(prevCount => prevCount - 1);
  }, []); // Empty dependency array - never recreates
  
  const resetCount = useCallback(() => {
    setCount(0);
  }, []); // Empty dependency array - never recreates
  
  return (
    <div>
      <p>Count: {count}</p>
      <CounterButtons 
        onIncrement={incrementCount}
        onDecrement={decrementCount}
        onReset={resetCount}
      />
      <p>Other state: {otherState}</p>
      <button onClick={() => setOtherState(otherState + 1)}>
        Update Other State
      </button>
    </div>
  );
}

// JavaScript Concepts:
// - Function References: Storing function references
// - State Updates: Using functional updates
// - Arrow Functions: Concise function syntax
// - Dependency Arrays: Controlling function recreation`}
        </div>
      </div>

      {/* Example 2: useCallback with Parameters */}
      <div className="example">
        <h3>Example 2: useCallback with Parameters</h3>
        <p>Using useCallback with parameters and dependencies to create dynamic callbacks.</p>
        <ParameterCallback />
        <div className="code-block">
{`function ParameterCallback() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  
  // Memoized callback with parameters
  const addItem = useCallback((itemName) => {
    setItems(prevItems => [
      ...prevItems,
      { id: Date.now(), name: itemName, completed: false }
    ]);
  }, []); // No dependencies - function never changes
  
  // Memoized callback that depends on filter
  const toggleItem = useCallback((itemId) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }, []); // No dependencies - function never changes
  
  // Memoized callback that depends on filter
  const getFilteredItems = useCallback(() => {
    if (filter === 'completed') {
      return items.filter(item => item.completed);
    } else if (filter === 'active') {
      return items.filter(item => !item.completed);
    }
    return items;
  }, [items, filter]); // Depends on items and filter
  
  return (
    <div>
      <ItemManager 
        onAddItem={addItem}
        onToggleItem={toggleItem}
        getFilteredItems={getFilteredItems}
        filter={filter}
        onFilterChange={setFilter}
      />
    </div>
  );
}

// JavaScript Concepts:
// - Array Methods: map(), filter(), spread operator
// - Date.now(): Generating unique IDs
// - Conditional Logic: if/else statements
// - Object Spread: Immutable updates`}
        </div>
      </div>

      {/* Example 3: useCallback with API Calls */}
      <div className="example">
        <h3>Example 3: useCallback with API Calls</h3>
        <p>Using useCallback to memoize API call functions and prevent unnecessary network requests.</p>
        <ApiCallback />
        <div className="code-block">
{`function ApiCallback() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(1);
  
  // Memoized API call function
  const fetchUserData = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
      const userData = await response.json();
      setData(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies - function never changes
  
  // Memoized function that depends on userId
  const fetchCurrentUser = useCallback(() => {
    fetchUserData(userId);
  }, [userId, fetchUserData]); // Depends on userId and fetchUserData
  
  return (
    <div>
      <input
        type="number"
        value={userId}
        onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
        min="1"
        max="10"
      />
      <button onClick={fetchCurrentUser}>Fetch User</button>
      <UserDisplay data={data} loading={loading} />
    </div>
  );
}

// JavaScript Concepts:
// - Async/Await: Handling asynchronous operations
// - Fetch API: Making HTTP requests
// - Template Literals: String interpolation
// - Try/Catch: Error handling`}
        </div>
      </div>

      {/* Example 4: useCallback with Child Component Optimization */}
      <div className="example">
        <h3>Example 4: useCallback with Child Component Optimization</h3>
        <p>Using useCallback with React.memo to optimize child component re-renders.</p>
        <OptimizedCallback />
        <div className="code-block">
{`// Memoized child component
const ExpensiveChild = memo(({ onAction, data, label }) => {
  console.log(\`Rendering \${label} component\`);
  
  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', margin: '0.5rem 0' }}>
      <h4>{label}</h4>
      <p>Data: {data}</p>
      <button onClick={onAction}>Perform Action</button>
    </div>
  );
});

function OptimizedCallback() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [sharedData, setSharedData] = useState('Shared Value');
  
  // Memoized callbacks for each child
  const handleAction1 = useCallback(() => {
    setCount1(prev => prev + 1);
    setSharedData('Updated by Component 1');
  }, []); // No dependencies
  
  const handleAction2 = useCallback(() => {
    setCount2(prev => prev + 1);
    setSharedData('Updated by Component 2');
  }, []); // No dependencies
  
  return (
    <div>
      <p>Shared Data: {sharedData}</p>
      <ExpensiveChild 
        onAction={handleAction1}
        data={count1}
        label="Component 1"
      />
      <ExpensiveChild 
        onAction={handleAction2}
        data={count2}
        label="Component 2"
      />
    </div>
  );
}

// JavaScript Concepts:
// - React.memo: Preventing unnecessary re-renders
// - Console.log: Debugging component renders
// - Template Literals: String interpolation
// - Arrow Functions: Component definitions`}
        </div>
      </div>

      <div className="js-concept">
        <h3>🔍 Key JavaScript Concepts Used in useCallback:</h3>
        <ul>
          <li><strong>Function Memoization:</strong> Caching function references to prevent recreation</li>
          <li><strong>Dependency Arrays:</strong> Controlling when callback functions should be recreated</li>
          <li><strong>Arrow Functions:</strong> Function expressions for callback definitions</li>
          <li><strong>Async/Await:</strong> Handling asynchronous operations in callbacks</li>
          <li><strong>Fetch API:</strong> Making HTTP requests from callbacks</li>
          <li><strong>Template Literals:</strong> String interpolation in API URLs</li>
          <li><strong>Try/Catch:</strong> Error handling in async callbacks</li>
          <li><strong>Array Methods:</strong> map(), filter(), spread operator for data manipulation</li>
          <li><strong>Date.now():</strong> Generating unique IDs in callbacks</li>
          <li><strong>React.memo:</strong> Preventing unnecessary child component re-renders</li>
          <li><strong>Console API:</strong> console.log() for debugging component renders</li>
          <li><strong>State Updates:</strong> Functional updates in callback functions</li>
        </ul>
      </div>
    </div>
  );
};

// Component implementations
function BasicCallback() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  
  // Memoized callback - only recreates when count changes
  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // Empty dependency array - never recreates
  
  const decrementCount = useCallback(() => {
    setCount(prevCount => prevCount - 1);
  }, []); // Empty dependency array - never recreates
  
  const resetCount = useCallback(() => {
    setCount(0);
  }, []); // Empty dependency array - never recreates
  
  return (
    <div>
      <p>Count: <strong>{count}</strong></p>
      <CounterButtons 
        onIncrement={incrementCount}
        onDecrement={decrementCount}
        onReset={resetCount}
      />
      <p>Other state: {otherState}</p>
      <button onClick={() => setOtherState(otherState + 1)} className="button">
        Update Other State
      </button>
    </div>
  );
}

const CounterButtons = memo(({ onIncrement, onDecrement, onReset }) => {
  console.log('Rendering CounterButtons component');
  
  return (
    <div>
      <button onClick={onIncrement} className="button">Increment</button>
      <button onClick={onDecrement} className="button">Decrement</button>
      <button onClick={onReset} className="button">Reset</button>
    </div>
  );
});

function ParameterCallback() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newItemName, setNewItemName] = useState('');
  
  // Memoized callback with parameters
  const addItem = useCallback((itemName) => {
    setItems(prevItems => [
      ...prevItems,
      { id: Date.now(), name: itemName, completed: false }
    ]);
  }, []); // No dependencies - function never changes
  
  // Memoized callback that depends on filter
  const toggleItem = useCallback((itemId) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }, []); // No dependencies - function never changes
  
  // Memoized callback that depends on filter
  const getFilteredItems = useCallback(() => {
    if (filter === 'completed') {
      return items.filter(item => item.completed);
    } else if (filter === 'active') {
      return items.filter(item => !item.completed);
    }
    return items;
  }, [items, filter]); // Depends on items and filter
  
  const handleAddItem = () => {
    if (newItemName.trim()) {
      addItem(newItemName);
      setNewItemName('');
    }
  };
  
  return (
    <div>
      <input
        type="text"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder="Add new item"
        className="input"
      />
      <button onClick={handleAddItem} className="button">Add Item</button>
      
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input">
        <option value="all">All Items</option>
        <option value="active">Active Items</option>
        <option value="completed">Completed Items</option>
      </select>
      
      <ItemList 
        items={getFilteredItems()}
        onToggleItem={toggleItem}
      />
    </div>
  );
}

const ItemList = memo(({ items, onToggleItem }) => {
  console.log('Rendering ItemList component');
  
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map(item => (
        <li key={item.id} style={{ 
          textDecoration: item.completed ? 'line-through' : 'none',
          margin: '0.5rem 0',
          padding: '0.5rem',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}>
          <span onClick={() => onToggleItem(item.id)} style={{ cursor: 'pointer' }}>
            {item.name}
          </span>
        </li>
      ))}
    </ul>
  );
});

function ApiCallback() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(1);
  
  // Memoized API call function
  const fetchUserData = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const userData = await response.json();
      setData(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies - function never changes
  
  // Memoized function that depends on userId
  const fetchCurrentUser = useCallback(() => {
    fetchUserData(userId);
  }, [userId, fetchUserData]); // Depends on userId and fetchUserData
  
  return (
    <div>
      <input
        type="number"
        value={userId}
        onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
        min="1"
        max="10"
        className="input"
      />
      <button onClick={fetchCurrentUser} className="button">Fetch User</button>
      <UserDisplay data={data} loading={loading} />
    </div>
  );
}

const UserDisplay = memo(({ data, loading }) => {
  console.log('Rendering UserDisplay component');
  
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No user data</p>;
  
  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', marginTop: '1rem' }}>
      <h4>{data.name}</h4>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
      <p>Company: {data.company?.name}</p>
    </div>
  );
});

function OptimizedCallback() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [sharedData, setSharedData] = useState('Shared Value');
  
  // Memoized callbacks for each child
  const handleAction1 = useCallback(() => {
    setCount1(prev => prev + 1);
    setSharedData('Updated by Component 1');
  }, []); // No dependencies
  
  const handleAction2 = useCallback(() => {
    setCount2(prev => prev + 1);
    setSharedData('Updated by Component 2');
  }, []); // No dependencies
  
  return (
    <div>
      <p>Shared Data: <strong>{sharedData}</strong></p>
      <ExpensiveChild 
        onAction={handleAction1}
        data={count1}
        label="Component 1"
      />
      <ExpensiveChild 
        onAction={handleAction2}
        data={count2}
        label="Component 2"
      />
    </div>
  );
}

// Memoized child component
const ExpensiveChild = memo(({ onAction, data, label }) => {
  console.log(`Rendering ${label} component`);
  
  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', margin: '0.5rem 0' }}>
      <h4>{label}</h4>
      <p>Data: <strong>{data}</strong></p>
      <button onClick={onAction} className="button">Perform Action</button>
    </div>
  );
});

export default UseCallbackExamples; 