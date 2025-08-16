import React, { useState } from 'react';

const FragmentsExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 Fragments Overview</h3>
      <p>Fragments let you group multiple elements without adding extra nodes to the DOM. Use &lt;&gt;...&lt;/&gt; or &lt;React.Fragment&gt;...&lt;/React.Fragment&gt;.</p>
      <div className="code-block">
{`<>
  <Child1 />
  <Child2 />
</>

// JavaScript Concepts:
// 1. Array Rendering - Fragments with keys
// 2. Table Rows - <tr> with fragments
// 3. Conditional Fragments - Grouping conditionally
// 4. Grouping - No extra DOM nodes`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: Basic Fragment</h3>
      <BasicFragment />
    </div>
    <div className="example">
      <h3>Example 2: Keyed Fragments in Lists</h3>
      <KeyedFragments />
    </div>
    <div className="example">
      <h3>Example 3: Table Rows with Fragments</h3>
      <TableRows />
    </div>
    <div className="example">
      <h3>Example 4: Conditional Fragments</h3>
      <ConditionalFragments />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Fragments:</h3>
      <ul>
        <li><strong>Fragments:</strong> Grouping elements without extra DOM nodes</li>
        <li><strong>Array Rendering:</strong> Fragments with keys in lists</li>
        <li><strong>Table Rows:</strong> &lt;tr&gt; with fragments</li>
        <li><strong>Conditional Rendering:</strong> Grouping conditionally</li>
        <li><strong>JSX Syntax:</strong> &lt;&gt;...&lt;/&gt;</li>
      </ul>
    </div>
  </div>
);

function BasicFragment() {
  return (
    <>
      <h4>Title in Fragment</h4>
      <p>This is inside a fragment.</p>
    </>
  );
}

function KeyedFragments() {
  const items = ['A', 'B', 'C'];
  return (
    <ul>
      {items.map((item) => (
        <React.Fragment key={item}>
          <li>{item}</li>
          <li>{item.toLowerCase()}</li>
        </React.Fragment>
      ))}
    </ul>
  );
}

function TableRows() {
  const rows = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 }
  ];
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ConditionalFragments() {
  const [show,setShow] = useState(true);

  return (
    <>

    <button className='button' onClick={()=> setShow(!show)}>Toggle</button>
      {show && (
        <>
          <h4>Shown!</h4>
          <p>This group is conditionally rendered.</p>
        </>
      )}
      {!show && (
        <>
          <h4>Hidden!</h4>
          <p>This group is hidden.</p>
        </>
      )}
    </>
  );
}

export default FragmentsExamples; 