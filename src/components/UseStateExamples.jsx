import React, { useState } from 'react';

const UseStateExamples = () => {
  return (
    <div>
      <div className="explanation">
        <h3>🎯 useState Hook Overview</h3>
        <p>
          <strong>useState</strong> is a React Hook that lets you add state to functional components. 
          It returns an array with two elements: the current state value and a function to update it.
        </p>
        <div className="code-block">
{`const [state, setState] = useState(initialValue);

// JavaScript Concepts Used:
// 1. Array Destructuring - Extracting values from arrays
// 2. Arrow Functions - Modern function syntax
// 3. Template Literals - String interpolation
// 4. Ternary Operators - Conditional expressions`}
        </div>
      </div>

      {/* Example 1: Basic Counter */}
      <div className="example">
        <h3>Example 1: Basic Counter</h3>
        <p>Simple counter with increment and decrement functionality.</p>
        <BasicCounter />
        <div className="code-block">
{`function BasicCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

// JavaScript Concepts:
// - Arrow Functions: () => setCount(count + 1)
// - Template Literals: \`Count: {count}\`
// - Event Handlers: onClick`}
        </div>
      </div>

      {/* Example 2: Form Input with State */}
      <div className="example">
        <h3>Example 2: Form Input with State</h3>
        <p>Managing form input state with controlled components.</p>
        <FormInput />
        <div className="code-block">
{`function FormInput() {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsValid(value.length >= 3);
  };
  
  return (
    <div>
      <input 
        type="text" 
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter text (min 3 chars)"
        className="input"
      />
      <p>Input: {inputValue}</p>
      <p>Valid: {isValid ? '✅' : '❌'}</p>
    </div>
  );
}

// JavaScript Concepts:
// - Event Objects: e.target.value
// - Logical Operators: value.length >= 3
// - Ternary Operators: isValid ? '✅' : '❌'`}
        </div>
      </div>

      {/* Example 3: Object State Management */}
      <div className="example">
        <h3>Example 3: Object State Management</h3>
        <p>Managing complex state with objects and spread operator.</p>
        <ObjectState />
        <div className="code-block">
{`function ObjectState() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });
  
  const updateField = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };
  
  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => updateField('name', e.target.value)}
        className="input"
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => updateField('email', e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Age"
        value={user.age}
        onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
        className="input"
      />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

// JavaScript Concepts:
// - Spread Operator: ...prevUser
// - Computed Properties: [field]: value
// - parseInt(): Converting string to number
// - JSON.stringify(): Converting object to string`}
        </div>
      </div>

      {/* Example 4: Array State Management */}
      <div className="example">
        <h3>Example 4: Array State Management</h3>
        <p>Managing arrays with state, including add, remove, and update operations.</p>
        <ArrayState />
        <div className="code-block">
{`function ArrayState() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prevTodos => [
        ...prevTodos,
        { id: Date.now(), text: newTodo, completed: false }
      ]);
      setNewTodo('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const removeTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
        className="input"
      />
      <button onClick={addTodo} className="button">Add Todo</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none',
            margin: '0.5rem 0'
          }}>
            <span onClick={() => toggleTodo(todo.id)} style={{ cursor: 'pointer' }}>
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)} className="button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// JavaScript Concepts:
// - Array Methods: map(), filter(), spread operator
// - Date.now(): Getting current timestamp
// - trim(): Removing whitespace
// - Conditional Styling: ternary operator for styles`}
        </div>
      </div>

      <div className="js-concept">
        <h3>🔍 Key JavaScript Concepts Used in useState:</h3>
        <ul>
          <li><strong>Array Destructuring:</strong> const [state, setState] = useState(initial)</li>
          <li><strong>Arrow Functions:</strong> () =&gt; setState(newValue)</li>
          <li><strong>Spread Operator:</strong> ...prevState for immutable updates</li>
          <li><strong>Template Literals:</strong> {'`Count: ${count}`'} for string interpolation</li>
          <li><strong>Ternary Operators:</strong> condition ? value1 : value2</li>
          <li><strong>Event Handling:</strong> onClick, onChange event handlers</li>
          <li><strong>Object Methods:</strong> JSON.stringify(), parseInt()</li>
          <li><strong>Array Methods:</strong> map(), filter(), find()</li>
        </ul>
      </div>
    </div>
  );
};

// Component implementations
function BasicCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className="button">Increment</button>
      <button onClick={() => setCount(count - 1)} className="button">Decrement</button>
      <button onClick={() => setCount(0)} className="button">Reset</button>
    </div>
  );
}

function FormInput() {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsValid(value.length >= 3);
  };
  
  return (
    <div>
      <input 
        type="text" 
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter text (min 3 chars)"
        className="input"
      />
      <p>Input: {inputValue}</p>
      <p>Valid: {isValid ? '✅' : '❌'}</p>
      <p>Character count: {inputValue.length}</p>
    </div>
  );
}

function ObjectState() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });
  
  const updateField = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };
  
  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => updateField('name', e.target.value)}
        className="input"
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => updateField('email', e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Age"
        value={user.age}
        onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
        className="input"
      />
      <div className="code-block">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}

function ArrayState() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prevTodos => [
        ...prevTodos,
        { id: Date.now(), text: newTodo, completed: false }
      ]);
      setNewTodo('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const removeTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
        className="input"
      />
      <button onClick={addTodo} className="button">Add Todo</button>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            textDecoration: todo.completed ? 'line-through' : 'none',
            margin: '0.5rem 0',
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            <span onClick={() => toggleTodo(todo.id)} style={{ cursor: 'pointer' }}>
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)} className="button" style={{ float: 'right' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UseStateExamples; 