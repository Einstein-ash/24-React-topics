import React, { useState, useRef } from 'react';

const FormHandlingExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 Form Handling Overview</h3>
      <p>React forms can be controlled (state-driven) or uncontrolled (ref-driven). You can validate, handle multiple fields, and manage submission.</p>
      <div className="code-block">
{`<input value={value} onChange={handleChange} /> // Controlled
<input ref={inputRef} /> // Uncontrolled
<form onSubmit={handleSubmit} />

// JavaScript Concepts:
// 1. State Management - Controlled components
// 2. Refs - Uncontrolled components
// 3. Validation - Checking input values
// 4. Event Handling - onChange, onSubmit`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: Controlled Input</h3>
      <ControlledInput />
    </div>
    <div className="example">
      <h3>Example 2: Uncontrolled Input</h3>
      <UncontrolledInput />
    </div>
    <div className="example">
      <h3>Example 3: Multi-Field Form</h3>
      <MultiFieldForm />
    </div>
    <div className="example">
      <h3>Example 4: Validation and Submit</h3>
      <ValidationForm />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Form Handling:</h3>
      <ul>
        <li><strong>State Management:</strong> useState for controlled inputs</li>
        <li><strong>Refs:</strong> useRef for uncontrolled inputs</li>
        <li><strong>Validation:</strong> Checking input values before submit</li>
        <li><strong>Event Handling:</strong> onChange, onSubmit, onBlur</li>
        <li><strong>Object Spread:</strong> Updating multiple fields</li>
      </ul>
    </div>
  </div>
);

function ControlledInput() {
  const [value, setValue] = useState('');
  return (
    <div>
      <input value={value} onChange={e => setValue(e.target.value)} className="input" placeholder="Controlled input..." />
      <p>Value: {value}</p>
    </div>
  );
}

function UncontrolledInput() {
  const inputRef = useRef();
  const [value, setValue] = useState('');
  const handleShow = () => setValue(inputRef.current.value);
  return (
    <div>
      <input ref={inputRef} className="input" placeholder="Uncontrolled input..." />
      <button onClick={handleShow} className="button">Show Value</button>
      <p>Value: {value}</p>
    </div>
  );
}

function MultiFieldForm() {
  const [form, setForm] = useState({ name: '', email: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange} className="input" placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} className="input" placeholder="Email" />
      <p>Name: {form.name}, Email: {form.email}</p>
    </form>
  );
}

function ValidationForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('All fields required');
    } else if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
    } else {
      setError('');
      alert('Form submitted!');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={form.username} onChange={handleChange} className="input" placeholder="Username" />
      <input name="password" type="password" value={form.password} onChange={handleChange} className="input" placeholder="Password" />
      <button type="submit" className="button">Submit</button>
      {error && <p style={{ color: '#e74c3c' }}>{error}</p>}
    </form>
  );
}

export default FormHandlingExamples; 