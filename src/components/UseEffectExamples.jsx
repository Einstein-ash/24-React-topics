import React, { useState, useEffect } from 'react';

const UseEffectExamples = () => {
  return (
    <div>
      <div className="explanation">
        <h3>🎯 useEffect Hook Overview</h3>
        <p>
          <strong>useEffect</strong> is a React Hook that lets you perform side effects in functional components. 
          It runs after every render and can be used for data fetching, subscriptions, or manually changing the DOM.
        </p>
        <div className="code-block">
{`useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);

// JavaScript Concepts Used:
// 1. Arrow Functions - Function expressions
// 2. Array Destructuring - Extracting values
// 3. Closures - Function scope and access to variables
// 4. Async/Await - For data fetching operations`}
        </div>
      </div>

      {/* Example 1: Basic useEffect with no dependencies */}
      <div className="example">
        <h3>Example 1: Basic useEffect (Runs after every render)</h3>
        <p>Simple effect that runs after every render and logs to console.</p>
        <BasicUseEffect />
        <div className="code-block">
{`function BasicUseEffect() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Component rendered, count is:', count);
    document.title = \`Count: \${count}\`;
  }); // No dependency array = runs after every render
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// JavaScript Concepts:
// - Template Literals: \`Count: \${count}\`
// - Arrow Functions: () => { ... }
// - Document API: document.title`}
        </div>
      </div>

      {/* Example 2: useEffect with dependencies */}
      <div className="example">
        <h3>Example 2: useEffect with Dependencies</h3>
        <p>Effect that only runs when specific values change.</p>
        <DependencyUseEffect />
        <div className="code-block">
{`function DependencyUseEffect() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    if (name && age) {
      setGreeting(\`Hello \${name}, you are \${age} years old!\`);
    }
  }, [name, age]); // Only runs when name or age changes
  
  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value) || 0)}
      />
      <p>{greeting}</p>
    </div>
  );
}

// JavaScript Concepts:
// - Logical Operators: && for conditional rendering
// - parseInt(): Converting string to number
// - Template Literals: String interpolation`}
        </div>
      </div>

      {/* Example 3: useEffect with cleanup */}
      <div className="example">
        <h3>Example 3: useEffect with Cleanup</h3>
        <p>Effect that sets up and cleans up event listeners or subscriptions.</p>
        <CleanupUseEffect />
        <div className="code-block">
{`function CleanupUseEffect() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array = runs only once
  
  return (
    <div>
      <p>Window size: {windowSize.width} x {windowSize.height}</p>
    </div>
  );
}

// JavaScript Concepts:
// - Event Listeners: addEventListener, removeEventListener
// - Window API: window.innerWidth, window.innerHeight
// - Object Literals: Creating objects with properties`}
        </div>
      </div>

      {/* Example 4: useEffect for data fetching */}
      <div className="example">
        <h3>Example 4: useEffect for Data Fetching</h3>
        <p>Effect that fetches data from an API and handles loading states.</p>
        <DataFetchingUseEffect />
        <div className="code-block">
{`function DataFetchingUseEffect() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []); // Empty array = fetch only once on mount
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div>
      <h4>Posts:</h4>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// JavaScript Concepts:
// - Async/Await: Modern promise handling
// - Try/Catch: Error handling
// - Fetch API: Making HTTP requests
// - Array Methods: map() for rendering lists`}
        </div>
      </div>

      <div className="js-concept">
        <h3>🔍 Key JavaScript Concepts Used in useEffect:</h3>
        <ul>
          <li><strong>Arrow Functions:</strong> () =&gt; { } for effect functions</li>
          <li><strong>Closures:</strong> Functions that remember their lexical scope</li>
          <li><strong>Async/Await:</strong> Modern way to handle promises</li>
          <li><strong>Try/Catch:</strong> Error handling in async operations</li>
          <li><strong>Event Listeners:</strong> addEventListener, removeEventListener</li>
          <li><strong>Fetch API:</strong> Making HTTP requests</li>
          <li><strong>Template Literals:</strong> String interpolation with variables</li>
          <li><strong>Array Methods:</strong> map(), filter() for data processing</li>
          <li><strong>Logical Operators:</strong> &&, || for conditional logic</li>
          <li><strong>Object Destructuring:</strong> Extracting properties from objects</li>
        </ul>
      </div>
    </div>
  );
};

// Component implementations
function BasicUseEffect() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Component rendered, count is:', count);
    document.title = `Count: ${count}`;
  }); // No dependency array = runs after every render
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className="button">Increment</button>
      <button onClick={() => setCount(0)} className="button">Reset</button>
      <p><small>Check console and browser tab title to see the effect!</small></p>
    </div>
  );
}

function DependencyUseEffect() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    if (name && age) {
      setGreeting(`Hello ${name}, you are ${age} years old!`);
    } else {
      setGreeting('');
    }
  }, [name, age]); // Only runs when name or age changes
  
  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value) || 0)}
        className="input"
      />
      <p style={{ color: '#27ae60', fontWeight: 'bold' }}>{greeting}</p>
    </div>
  );
}

function CleanupUseEffect() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array = runs only once
  
  return (
    <div>
      <p>Window size: <strong>{windowSize.width}</strong> x <strong>{windowSize.height}</strong></p>
      <p><small>Try resizing your browser window to see the effect!</small></p>
    </div>
  );
}

function DataFetchingUseEffect() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []); // Empty array = fetch only once on mount
  
  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: '#e74c3c' }}>Error: {error}</p>;
  
  return (
    <div>
      <h4>Posts from API:</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map(post => (
          <li key={post.id} style={{ 
            padding: '0.5rem', 
            margin: '0.5rem 0', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            backgroundColor: '#f8f9fa'
          }}>
            <strong>{post.title}</strong>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#666' }}>
              {post.body.substring(0, 100)}...
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UseEffectExamples; 