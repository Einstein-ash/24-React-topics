import React, { useState, memo } from 'react';

const MemoExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 React.memo & Memoization Overview</h3>
      <p>React.memo is a higher order component that memoizes a component, preventing unnecessary re-renders if props don't change.</p>
      <div className="code-block">
{`const MemoizedComponent = React.memo(Component);

// JavaScript Concepts:
// 1. Pure Components - Only re-render on prop change
// 2. Shallow Comparison - React.memo uses shallow props check
// 3. Expensive Renders - Avoiding unnecessary work
// 4. Child Optimization - Memoizing children`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: Pure Component with React.memo</h3>
      <PureMemoExample />
    </div>
    <div className="example">
      <h3>Example 2: Props Change Optimization</h3>
      <PropsChangeExample />
    </div>
    <div className="example">
      <h3>Example 3: Child Component Optimization</h3>
      <ChildOptimizationExample />
    </div>
    <div className="example">
      <h3>Example 4: Expensive Render Avoidance</h3>
      <ExpensiveRenderExample />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Memoization:</h3>
      <ul>
        <li><strong>Pure Components:</strong> Only re-render on prop change</li>
        <li><strong>Shallow Comparison:</strong> React.memo uses shallow props check</li>
        <li><strong>Expensive Renders:</strong> Avoiding unnecessary work</li>
        <li><strong>Child Optimization:</strong> Memoizing children</li>
        <li><strong>Props:</strong> Passing data to children</li>
      </ul>
    </div>
  </div>
);

const PureComponent = memo(({ value }) => {
  console.log('PureComponent rendered');
  return <div>PureComponent value: {value}</div>;
});
function PureMemoExample() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <PureComponent value={value} />
      <button onClick={() => setValue(value + 1)} className="button">Increment</button>
    </div>
  );
}
function PropsChangeExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const MemoChild = memo(({ count }) => {
    console.log('MemoChild rendered');
    return <div>MemoChild count: {count}</div>;
  });
  return (
    <div>
      <MemoChild count={count} />
      <button onClick={() => setCount(count + 1)} className="button">Increment Count</button>
      <input value={text} onChange={e => setText(e.target.value)} className="input" placeholder="Type here..." />
    </div>
  );
}
function ChildOptimizationExample() {
  const [parentCount, setParentCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const Child = memo(({ count }) => {
    console.log('Child rendered');
    return <div>Child count: {count}</div>;
  });
  return (
    <div>
      <Child count={childCount} />
      <button onClick={() => setChildCount(childCount + 1)} className="button">Increment Child</button>
      <button onClick={() => setParentCount(parentCount + 1)} className="button">Increment Parent</button>
      <p>Parent count: {parentCount}</p>
    </div>
  );
}
function ExpensiveRenderExample() {
  const [count, setCount] = useState(0);
  const Expensive = memo(() => {
    console.log('Expensive rendered');
    let total = 0;
    for (let i = 0; i < 1e7; i++) total += i;
    return <div>Expensive calculation: {total}</div>;
  });
  return (
    <div>
      <Expensive />
      <button onClick={() => setCount(count + 1)} className="button">Increment</button>
      <p>Count: {count}</p>
    </div>
  );
}

export default MemoExamples; 