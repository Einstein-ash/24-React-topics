import React, {useState} from 'react';

const ListRenderingExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 List Rendering Overview</h3>
      <p>
        Render lists in React using map(), unique keys, and dynamic/nested lists. Keys help React identify which items have changed.
      </p>
      <div className="code-block">
        {`{items.map(item => <li key={item.id}>{item.name}</li>)}

// JavaScript Concepts:
// 1. Array.map() - Transforming arrays
// 2. Unique Keys - Required for list items
// 3. Dynamic Lists - Adding/removing items
// 4. Nested Lists - Rendering lists inside lists`}

      </div>
    </div>
    <div className="example">
      <h3>Example 1: Basic List Rendering</h3>
      <BasicList />
    </div>
    <div className="example">
      <h3>Example 2: Dynamic List (Add/Remove)</h3>
      <DynamicList />
    </div>
    <div className="example">
      <h3>Example 3: Nested Lists</h3>
      <NestedList />
    </div>
    <div className="example">
      <h3>Example 4: Unique Keys</h3>
      <UniqueKeys />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in List Rendering:</h3>
      <ul>
        <li><strong>Array.map():</strong> Transforming arrays into elements</li>
        <li><strong>Unique Keys:</strong> Required for efficient rendering</li>
        <li>
          <strong>Dynamic Lists:</strong> Adding/removing items from state
        </li>
        <li><strong>Nested Lists:</strong> Rendering lists inside lists</li>
        <li><strong>Array Methods:</strong> filter(), find(), concat()</li>
      </ul>
    </div>
  </div>
);

function BasicList () {
  const fruits = ['Apple', 'Banana', 'Cherry', 'Date'];
  return (
    <ul>
      {fruits.map ((fruit, idx) => <li key={idx}>{fruit}</li>)}
    </ul>
  );
}

function DynamicList () {
  const [items, setItems] = useState ([]);
  const [input, setInput] = useState ('');

  const addItem = () => {
    if (input.trim ()) {
      setItems ([...items, {id: Date.now (), name: input}]);
      setInput ('');
    }
  };
  const removeItem = (id) => {
    setItems ( items.filter(item => item.id !== id))
  }

  return (
    <div>
      <input
        value={input}
        onChange={e => setInput (e.target.value)}
        className="input"
        placeholder="Add item..."
      />
      <button onClick={addItem} className="button">Add</button>
      <ul>
        {items.map (item => (
          <li key={item.id}>
            {item.name}
            {' - '}
            <button onClick={() => removeItem (item.id)} className="button">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NestedList () {
  const categories = [
    {name: 'Fruits', items: ['Apple', 'Banana']},
    {name: 'Vegetables', items: ['Carrot', 'Broccoli']},
  ];
  return (
    <div>
      {categories.map (cat => (
        <div key={cat.name}>
          <h4>{cat.name}</h4>
          <ul>
            {cat.items.map (item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function UniqueKeys () {
  const [users] = useState ([
    {id: 1, name: 'Alice'},
    {id: 2, name: 'Bob'},
    {id: 3, name: 'Charlie'},
  ]);
  return (
    <ul>
      {users.map (user => ( 
         <li key={user.id}>{user.name}</li>
      ))
    }
    </ul>

  );
}

export default ListRenderingExamples;
