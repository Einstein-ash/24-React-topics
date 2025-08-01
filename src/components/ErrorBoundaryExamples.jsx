import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // You can log error info here
    if (this.props.onError) this.props.onError(error, info);
  }
  handleReset = () => this.setState({ hasError: false, error: null });
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#fff3cd', padding: '1rem', borderRadius: '8px' }}>
          <h3>Something went wrong!</h3>
          <p>{this.state.error?.toString()}</p>
          <button onClick={this.handleReset} className="button">Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ErrorBoundaryExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 Error Boundaries Overview</h3>
      <p>Error boundaries catch JavaScript errors in child components and display a fallback UI instead of crashing the app.</p>
      <div className="code-block">
{`class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) { ... }
  componentDidCatch(error, info) { ... }
  render() { ... }
}

// JavaScript Concepts:
// 1. Class Components - Lifecycle methods
// 2. Error Handling - try/catch, error objects
// 3. Fallback UI - Displaying alternative content
// 4. State Management - hasError flag`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: Basic Error Boundary</h3>
      <ErrorBoundary>
        <ErrorThrower />
      </ErrorBoundary>
    </div>
    <div className="example">
      <h3>Example 2: Fallback UI and Reset</h3>
      <ErrorBoundary>
        <ErrorThrowerWithReset />
      </ErrorBoundary>
    </div>
    <div className="example">
      <h3>Example 3: Logging Errors</h3>
      <ErrorBoundary onError={(error, info) => alert('Logged: ' + error)}>
        <ErrorThrowerWithLog />
      </ErrorBoundary>
    </div>
    <div className="example">
      <h3>Example 4: Error in Child Component</h3>
      <ErrorBoundary>
        <ChildErrorDemo />
      </ErrorBoundary>
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Error Boundaries:</h3>
      <ul>
        <li><strong>Class Components:</strong> Lifecycle methods for error handling</li>
        <li><strong>Error Handling:</strong> try/catch, error objects</li>
        <li><strong>Fallback UI:</strong> Displaying alternative content</li>
        <li><strong>State Management:</strong> hasError flag for error state</li>
        <li><strong>Reset Logic:</strong> Resetting error state</li>
        <li><strong>Logging:</strong> Logging errors to services or console</li>
      </ul>
    </div>
  </div>
);

function ErrorThrower() {
  throw new Error('This is a thrown error!');
}
function ErrorThrowerWithReset() {
  const [shouldThrow, setShouldThrow] = React.useState(false);
  if (shouldThrow) throw new Error('Error after clicking!');
  return <button onClick={() => setShouldThrow(true)} className="button">Throw Error</button>;
}
function ErrorThrowerWithLog() {
  throw new Error('This error will be logged!');
}
function ChildErrorDemo() {
  return <ErrorChild />;
}
function ErrorChild() {
  throw new Error('Error in child component!');
}

export default ErrorBoundaryExamples; 