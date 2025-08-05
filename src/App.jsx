import React, { useState } from 'react';
import UseStateExamples from './components/UseStateExamples';
import UseEffectExamples from './components/UseEffectExamples';
import UseRefExamples from './components/UseRefExamples';
import UseContextExamples from './components/UseContextExamples';
import UseReducerExamples from './components/UseReducerExamples';
import UseMemoExamples from './components/UseMemoExamples';
import UseCallbackExamples from './components/UseCallbackExamples';
import CustomHooksExamples from './components/CustomHooksExamples';
import PropsExamples from './components/PropsExamples';
import EventHandlingExamples from './components/EventHandlingExamples';
import ConditionalRenderingExamples from './components/ConditionalRenderingExamples';
import ListRenderingExamples from './components/ListRenderingExamples';
import FormHandlingExamples from './components/FormHandlingExamples';
import LifecycleExamples from './components/LifecycleExamples';
import ErrorBoundaryExamples from './components/ErrorBoundaryExamples';
import PortalsExamples from './components/PortalsExamples';
import ForwardRefExamples from './components/ForwardRefExamples';
import FragmentsExamples from './components/FragmentsExamples';
import MemoExamples from './components/MemoExamples';
import TimeoutIntervalExamples from './components/TimeoutIntervalExamples';
import DebounceThrottleExamples from './components/DebounceThrottleExamples';
import AnimationExamples from './components/AnimationExamples';
import PollingExamples from './components/PollingExamples';

function App() {
  const [activeSection, setActiveSection] = useState('useState');

  const sections = {
    useState: { title: 'useState Hook', component: UseStateExamples },
    useEffect: { title: 'useEffect Hook', component: UseEffectExamples },
    useRef: { title: 'useRef Hook', component: UseRefExamples },
    useContext: { title: 'useContext Hook', component: UseContextExamples },
    useReducer: { title: 'useReducer Hook', component: UseReducerExamples },
    useMemo: { title: 'useMemo Hook', component: UseMemoExamples },
    useCallback: { title: 'useCallback Hook', component: UseCallbackExamples },
    customHooks: { title: 'Custom Hooks', component: CustomHooksExamples },
    props: { title: 'Props', component: PropsExamples },
    eventHandling: { title: 'Event Handling', component: EventHandlingExamples },
    conditionalRendering: { title: 'Conditional Rendering', component: ConditionalRenderingExamples },
    listRendering: { title: 'List Rendering', component: ListRenderingExamples },
    formHandling: { title: 'Form Handling', component: FormHandlingExamples },
    lifecycle: { title: 'Component Lifecycle', component: LifecycleExamples },
    errorBoundary: { title: 'Error Boundaries', component: ErrorBoundaryExamples },
    portals: { title: 'Portals', component: PortalsExamples },
    forwardRef: { title: 'Forwarding Refs', component: ForwardRefExamples },
    fragments: { title: 'Fragments', component: FragmentsExamples },
    memo: { title: 'React.memo', component: MemoExamples },
    timeoutInterval: { title: 'Timeout & Intervals', component: TimeoutIntervalExamples },
    debounceThrottle: { title: 'Debounce & Throttle', component: DebounceThrottleExamples },
    animation: { title: 'Animations', component: AnimationExamples },
    polling: { title: 'Polling & Real-time', component: PollingExamples }
  };

  const showEntries = () =>{
    console.log("choco");
    console.log("values -> ", Object.values(sections));
    console.log("entries -> ", Object.entries(sections));
  }

  const ActiveComponent = sections[activeSection].component;

  return (
    <div className="container">
      <nav className="nav">
        <h1>🎯 React.js Learning Project - Ace Your Frontend Interview!</h1>
        <p style={{ color: '#bdc3c7', textAlign: 'center', marginTop: '0.5rem' }}>
          Comprehensive examples for every React concept with JavaScript explanations
        </p>
      </nav>

      <div className="section">
        <button onClick={showEntries} className='button'>entries </button>
        <h2>📚 Navigation</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {Object.entries(sections).map(([key, { title }]) => (
            <button
              key={key}
              className="button"
              style={{
                background: activeSection === key ? '#e74c3c' : '#3498db'
              }}
              onClick={() => setActiveSection(key)}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>📖 {sections[activeSection].title}</h2>
        <ActiveComponent />
      </div>
    </div>
  );
}

export default App; 