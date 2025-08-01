import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const ForwardRefExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 Forwarding Refs Overview</h3>
      <p>Forwarding refs lets parent components access child DOM nodes or methods. Useful for focus, animations, or imperative actions.</p>
      <div className="code-block">
{`const FancyInput = forwardRef((props, ref) => <input ref={ref} {...props} />);

// JavaScript Concepts:
// 1. forwardRef - Passing refs to children
// 2. useImperativeHandle - Customizing ref values
// 3. Callback Refs - Function refs
// 4. HOC - Higher-order components with refs`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: Focus Input with Forwarded Ref</h3>
      <FocusInputExample />
    </div>
    <div className="example">
      <h3>Example 2: Parent Access to Child Methods</h3>
      <ParentAccessExample />
    </div>
    <div className="example">
      <h3>Example 3: Callback Ref</h3>
      <CallbackRefExample />
    </div>
    <div className="example">
      <h3>Example 4: HOC with Forwarded Ref</h3>
      <HOCForwardRefExample />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Forwarding Refs:</h3>
      <ul>
        <li><strong>forwardRef:</strong> Passing refs to child components</li>
        <li><strong>useImperativeHandle:</strong> Customizing ref values</li>
        <li><strong>Callback Refs:</strong> Function refs for dynamic assignment</li>
        <li><strong>HOC:</strong> Higher-order components with refs</li>
        <li><strong>Imperative Actions:</strong> Focusing, selecting, etc.</li>
      </ul>
    </div>
  </div>
);

const FancyInput = forwardRef((props, ref) => <input ref={ref} className="input" {...props} />);

function FocusInputExample() {
  const inputRef = useRef();
  return (
    <div>
      <FancyInput ref={inputRef} placeholder="Click button to focus" />
      <button onClick={() => inputRef.current.focus()} className="button">Focus Input</button>
    </div>
  );
}

const ImperativeInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    select: () => inputRef.current.select(),
    value: () => inputRef.current.value
  }));
  return <input ref={inputRef} className="input" {...props} />;
});

function ParentAccessExample() {
  const ref = useRef();
  return (
    <div>
      <ImperativeInput ref={ref} placeholder="Parent can focus/select" />
      <button onClick={() => ref.current.focus()} className="button">Focus</button>
      <button onClick={() => ref.current.select()} className="button">Select</button>
      <button onClick={() => alert(ref.current.value())} className="button">Show Value</button>
    </div>
  );
}

function CallbackRefExample() {
  const [value, setValue] = React.useState('');
  let inputRef = null;
  const setInputRef = node => { inputRef = node; };
  return (
    <div>
      <input ref={setInputRef} className="input" onChange={e => setValue(e.target.value)} placeholder="Callback ref input" />
      <button onClick={() => inputRef && inputRef.focus()} className="button">Focus</button>
      <p>Value: {value}</p>
    </div>
  );
}

function withForwardedRef(Component) {
  return forwardRef((props, ref) => <Component {...props} forwardedRef={ref} />);
}
const InputWithRef = withForwardedRef((props) => <input ref={props.forwardedRef} className="input" placeholder="HOC input" />);
function HOCForwardRefExample() {
  const ref = useRef();
  return (
    <div>
      <InputWithRef ref={ref} />
      <button onClick={() => ref.current && ref.current.focus()} className="button">Focus HOC Input</button>
    </div>
  );
}

export default ForwardRefExamples; 