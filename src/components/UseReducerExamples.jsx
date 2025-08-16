import React, {useReducer, useState} from 'react';

const UseReducerExamples = () => {
  return (
    <div>
      <div className="explanation">
        <h3>🎯 useReducer Hook Overview</h3>
        <p>
          <strong>useReducer</strong> is a React Hook that is used for state
          management in complex components. It follows the reducer pattern from
          Redux and is useful when you have complex state logic that involves
          multiple sub-values or when the next state depends on the previous
          one.
        </p>
        <div className="code-block">
          {`const [state, dispatch] = useReducer(reducer, initialState);

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// JavaScript Concepts Used:
// 1. Switch Statements - Multiple conditional logic
// 2. Object Spread - Immutable state updates
// 3. Action Objects - Standardized state changes
// 4. Dispatch Function - Triggering state changes`}
        </div>
      </div>

      {/* Example 1: Basic Counter with useReducer */}
      <div className="example">
        <h3>Example 1: Basic Counter with useReducer</h3>
        <p>
          Simple counter implementation using useReducer instead of useState.
        </p>
        <BasicCounter />
        <div className="code-block">
          {`function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET_VALUE':
      return { count: action.payload };
    default:
      return state;
  }
}

function BasicCounter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'SET_VALUE', payload: 10 })}>Set to 10</button>
    </div>
  );
}

// JavaScript Concepts:
// - Switch Statements: Multiple action types
// - Action Objects: { type: 'INCREMENT' }
// - Payload: Passing data with actions
// - Object Destructuring: Extracting state and dispatch`}
        </div>
      </div>

      {/* Example 2: Todo List with useReducer */}
      <div className="example">
        <h3>Example 2: Todo List with useReducer</h3>
        <p>
          Managing a todo list with add, toggle, delete, and filter operations.
        </p>
        <TodoList />
        <div className="code-block">
{`function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

// JavaScript Concepts:
// - Array Methods: map(), filter(), spread operator
// - Date.now(): Generating unique IDs
// - Object Spread: Immutable updates
// - Conditional Logic: Ternary operators`}
        </div>
      </div>

      {/* Example 3: Shopping Cart with useReducer */}
      <div className="example">
        <h3>Example 3: Shopping Cart with useReducer</h3>
        <p>
          Complex shopping cart management with products, quantities, and
          totals.
        </p>
        <ShoppingCart />
        <div className="code-block">
          {`function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

// JavaScript Concepts:
// - Array.find(): Finding existing items
// - Math.max(): Ensuring non-negative quantities
// - Complex State: Multiple properties in state object
// - Nested Updates: Updating specific item properties`}
        </div>
      </div>

      {/* Example 4: Form Validation with useReducer */}
      <div className="example">
        <h3>Example 4: Form Validation with useReducer</h3>
        <p>
          Managing form state and validation with multiple fields and error
          handling.
        </p>
        <FormValidation />
        <div className="code-block">
          {`function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.field]: action.payload.value
        },
        errors: {
          ...state.errors,
          [action.payload.field]: ''
        }
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error
        }
      };
    case 'VALIDATE_FORM':
      const newErrors = {};
      if (!state.values.name.trim()) {
        newErrors.name = 'dName is require';
      }
      if (!state.values.email.includes('@')) {
        newErrors.email = 'Valid email is required';
      }
      if (state.values.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      return {
        ...state,
        errors: newErrors,
        isValid: Object.keys(newErrors).length === 0
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

// JavaScript Concepts:
// - Object.keys(): Getting object property names
// - String Methods: trim(), includes(), length
// - Computed Properties: [action.payload.field]
// - Complex Validation: Multiple field validation`}
        </div>
      </div>

      <div className="js-concept">
        <h3>🔍 Key JavaScript Concepts Used in useReducer:</h3>
        <ul>
          <li>
            <strong>Switch Statements:</strong> Multiple conditional logic for
            different actions
          </li>
          <li>
            <strong>Object Spread:</strong> ...state for immutable state updates
          </li>
          <li>
            <strong>Array Methods:</strong> map(), filter(), find(), reduce()
            for data manipulation
          </li>
          <li>
            <strong>Action Objects:</strong> Standardized format for state
            changes
          </li>
          <li>
            <strong>Payload:</strong> Passing data with actions
          </li>
          <li>
            <strong>Computed Properties:</strong> [field]: value for dynamic
            property names
          </li>
          <li>
            <strong>Object.keys():</strong> Getting object property names for
            validation
          </li>
          <li>
            <strong>String Methods:</strong> trim(), includes(), length for
            validation
          </li>
          <li>
            <strong>Math Functions:</strong> Math.max() for ensuring positive
            values
          </li>
          <li>
            <strong>Date.now():</strong> Generating unique IDs
          </li>
          <li>
            <strong>Ternary Operators:</strong> Conditional expressions in map
            functions
          </li>
          <li>
            <strong>Complex State:</strong> Managing multiple properties in a
            single state object
          </li>
        </ul>
      </div>
    </div>
  );
};

// Reducer functions
function counterReducer (state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {count: state.count + 1};
    case 'DECREMENT':
      return {count: state.count - 1};
    case 'RESET':
      return {count: 0};
    case 'SET_VALUE':
      return {count: action.payload};
    default:
      return state;
  }
}

function todoReducer (state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now (),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map (
          todo =>
            todo.id === action.payload
              ? {...todo, completed: !todo.completed}
              : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter (todo => todo.id !== action.payload),
      };
    case 'SET_FILTER':
      return {...state, filter: action.payload};
    default:
      return state;
  }
}

function cartReducer (state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find (
        item => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map (
            item =>
              item.id === action.payload.id
                ? {...item, quantity: item.quantity + 1}
                : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, {...action.payload, quantity: 1}],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter (item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map (
            item =>
              item.id === action.payload.id
                ? {...item, quantity: Math.max (0, action.payload.quantity)}
                : item
          )
          .filter (item => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return {...state, items: []};
    default:
      return state;
  }
}

function formReducer (state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.field]: action.payload.value,
        },
        errors: {
          ...state.errors,
          [action.payload.field]: '',
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error,
        },
      };
    case 'VALIDATE_FORM':
      const newErrors = {};
      if (!state.values.name.trim ()) {
        newErrors.name = 'Name is required';
      }
      if (!state.values.email.includes ('@')) {
        newErrors.email = 'Valid email is required';
      }
      if (state.values.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      return {
        ...state,
        errors: newErrors,
        isValid: Object.keys (newErrors).length === 0,
      };
    case 'RESET_FORM':
      return {
        values: {name: '', email: '', password: ''},
        errors: {},
        isValid: false,
      };
    default:
      return state;
  }
}

// Component implementations
function BasicCounter () {
  const [state, dispatch] = useReducer (counterReducer, {count: 0});

  return (
    <div>
      <p>
        Count: <strong>{state.count}</strong>
      </p>
      <button onClick={() => dispatch ({type: 'INCREMENT'})} className="button">
        +
      </button>
      <button onClick={() => dispatch ({type: 'DECREMENT'})} className="button">
        -
      </button>
      <button onClick={() => dispatch ({type: 'RESET'})} className="button">
        Reset
      </button>
      <button
        onClick={() => dispatch ({type: 'SET_VALUE', payload: 10})}
        className="button"
      >
        Set to 10
      </button>
    </div>
  );
}

function TodoList () {
  const [state, dispatch] = useReducer (todoReducer, {
    todos: [],
    filter: 'all',
  });
  const [newTodo, setNewTodo] = useState ('');

  const addTodo = () => {
    if (newTodo.trim ()) {
      dispatch ({type: 'ADD_TODO', payload: newTodo});
      setNewTodo ('');
    }
  };

  const filteredTodos = state.todos.filter (todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo (e.target.value)}
        placeholder="Add new todo"
        className="input"
      />
      <button onClick={addTodo} className="button">
        Add Todo
      </button>

      <div style={{margin: '10px 0'}}>
        <button
          onClick={() => dispatch ({type: 'SET_FILTER', payload: 'all'})}
          className="button"
          style={{background: state.filter === 'all' ? '#e74c3c' : '#3498db'}}
        >
          All
        </button>
        <button
          onClick={() => dispatch ({type: 'SET_FILTER', payload: 'active'})}
          className="button"
          style={{
            background: state.filter === 'active' ? '#e74c3c' : '#3498db',
          }}
        >
          Active
        </button>
        <button
          onClick={() => dispatch ({type: 'SET_FILTER', payload: 'completed'})}
          className="button"
          style={{
            background: state.filter === 'completed' ? '#e74c3c' : '#3498db',
          }}
        >
          Completed
        </button>
      </div>

      <ul style={{listStyle: 'none', padding: 0}}>
        {filteredTodos.map (todo => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              margin: '0.5rem 0',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          >
            <span
              onClick={() => dispatch ({type: 'TOGGLE_TODO', payload: todo.id})}
              style={{cursor: 'pointer'}}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch ({type: 'DELETE_TODO', payload: todo.id})}
              className="button"
              style={{float: 'right'}}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShoppingCart () {
  const [state, dispatch] = useReducer (cartReducer, {items: []});

  const products = [
    {id: 1, name: 'Laptop', price: 999},
    {id: 2, name: 'Mouse', price: 25},
    {id: 3, name: 'Keyboard', price: 75},
  ];

  const getTotal = () => {
    return state.items.reduce (
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
      <div>
        <h4>Products:</h4>
        {products.map (product => (
          <div
            key={product.id}
            style={{
              margin: '10px 0',
              padding: '10px',
              border: '1px solid #ddd',
            }}
          >
            <p>
              {product.name} - ${product.price}
            </p>
            <button
              onClick={() => dispatch ({type: 'ADD_ITEM', payload: product})}
              className="button"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div>
        <h4>Cart ({state.items.length} items):</h4>
        {state.items.map (item => (
          <div
            key={item.id}
            style={{
              margin: '10px 0',
              padding: '10px',
              border: '1px solid #ddd',
            }}
          >
            <p>
              {item.name} - ${item.price}
            </p>
            <input
              type="number"
              value={item.quantity}
              onChange={e =>
                dispatch ({
                  type: 'UPDATE_QUANTITY',
                  payload: {
                    id: item.id,
                    quantity: parseInt (e.target.value) || 0,
                  },
                })}
              min="0"
              className="input"
              style={{width: '60px'}}
            />
            <button
              onClick={() => dispatch ({type: 'REMOVE_ITEM', payload: item.id})}
              className="button"
            >
              Remove
            </button>
          </div>
        ))}
        <p>
          <strong>Total: ${getTotal ()}</strong>
        </p>
        <button
          onClick={() => dispatch ({type: 'CLEAR_CART'})}
          className="button"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

function FormValidation () {
  const [state, dispatch] = useReducer (formReducer, {
    values: {name: '', email: '', password: ''},
    errors: {},
    isValid: false,
  });

  const handleChange = (field, value) => {
    dispatch ({type: 'UPDATE_FIELD', payload: {field, value}});
  };

  const handleSubmit = e => {
    e.preventDefault ();
    dispatch ({type: 'VALIDATE_FORM'});

    if (state.isValid) {
      alert ('Form submitted successfully!');
      dispatch ({type: 'RESET_FORM'});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={state.values.name}
          onChange={e => handleChange ('name', e.target.value)}
          placeholder="Name"
          className="input"
        />
        {state.errors.name &&
          <p style={{color: '#e74c3c', fontSize: '0.8rem'}}>
            {state.errors.name}
          </p>}
      </div>

      <div>
        <input
          type="email"
          value={state.values.email}
          onChange={e => handleChange ('email', e.target.value)}
          placeholder="Email"
          className="input"
        />
        {state.errors.email &&
          <p style={{color: '#e74c3c', fontSize: '0.8rem'}}>
            {state.errors.email}
          </p>}
      </div>

      <div>
        <input
          type="password"
          value={state.values.password}
          onChange={e => handleChange ('password', e.target.value)}
          placeholder="Password"
          className="input"
        />
        {state.errors.password &&
          <p style={{color: '#e74c3c', fontSize: '0.8rem'}}>
            {state.errors.password}
          </p>}
      </div>

      <button type="submit" className="button">
        Submit
      </button>
      <button
        type="button"
        onClick={() => dispatch ({type: 'RESET_FORM'})}
        className="button"
      >
        Reset
      </button>
    </form>
  );
}

export default UseReducerExamples;
