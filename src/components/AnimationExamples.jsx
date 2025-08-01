import React, { useState, useEffect } from 'react';

const AnimationExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 Animation & Transitions Overview</h3>
      <p>Creating smooth animations and transitions in React using CSS, timing functions, and state management for dynamic effects.</p>
      <div className="code-block">
{`// CSS Transitions
transition: all 0.3s ease-in-out;

// CSS Animations
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

// JavaScript Concepts:
// 1. setTimeout/setInterval - Timing control
// 2. CSS-in-JS - Dynamic styles
// 3. State management - Animation states
// 4. useEffect - Animation lifecycle`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: CSS Transitions</h3>
      <CSSTransitions />
    </div>
    <div className="example">
      <h3>Example 2: Keyframe Animations</h3>
      <KeyframeAnimations />
    </div>
    <div className="example">
      <h3>Example 3: Staggered Animations</h3>
      <StaggeredAnimations />
    </div>
    <div className="example">
      <h3>Example 4: Timing Functions</h3>
      <TimingFunctions />
    </div>
    <div className="example">
      <h3>Example 5: Animation with JavaScript</h3>
      <JSAnimations />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Animations:</h3>
      <ul>
        <li><strong>setTimeout/setInterval:</strong> Timing control for animations</li>
        <li><strong>CSS-in-JS:</strong> Dynamic styles and transitions</li>
        <li><strong>State management:</strong> Animation states and triggers</li>
        <li><strong>useEffect:</strong> Animation lifecycle management</li>
        <li><strong>Array methods:</strong> map for staggered animations</li>
        <li><strong>Template literals:</strong> Dynamic CSS values</li>
      </ul>
    </div>
  </div>
);

function CSSTransitions() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <div
        style={{
          width: isExpanded ? '300px' : '100px',
          height: '100px',
          backgroundColor: isExpanded ? '#3498db' : '#e74c3c',
          transition: 'all 0.5s ease-in-out',
          margin: '1rem 0',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Expanded!' : 'Click to expand'}
      </div>
      
      <button onClick={() => setIsVisible(!isVisible)} className="button">
        {isVisible ? 'Hide' : 'Show'} Element
      </button>
      
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          marginTop: '1rem'
        }}
      >
        This element fades in and slides down!
      </div>
    </div>
  );
}

function KeyframeAnimations() {
  const [isAnimating, setIsAnimating] = useState(false);

  const keyframeStyles = `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-30px);
      }
      60% {
        transform: translateY(-15px);
      }
    }
    
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  `;

  return (
    <div>
      <style>{keyframeStyles}</style>
      
      <button onClick={() => setIsAnimating(!isAnimating)} className="button">
        {isAnimating ? 'Stop' : 'Start'} Animations
      </button>
      
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#e74c3c',
            borderRadius: '50%',
            animation: isAnimating ? 'bounce 1s infinite' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}
        >
          Bounce
        </div>
        
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#3498db',
            borderRadius: '8px',
            animation: isAnimating ? 'rotate 2s linear infinite' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}
        >
          Rotate
        </div>
        
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#27ae60',
            borderRadius: '8px',
            animation: isAnimating ? 'pulse 1.5s ease-in-out infinite' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}
        >
          Pulse
        </div>
      </div>
    </div>
  );
}

function StaggeredAnimations() {
  const [items, setItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Create staggered animation effect
      const newItems = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        delay: i * 200 // 200ms delay between each item
      }));
      setItems(newItems);
    } else {
      setItems([]);
    }
  }, [isVisible]);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)} className="button">
        {isVisible ? 'Hide' : 'Show'} Staggered Items
      </button>
      
      <div style={{ marginTop: '2rem' }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
              transition: `opacity 0.5s ease ${item.delay}ms, transform 0.5s ease ${item.delay}ms`,
              padding: '1rem',
              margin: '0.5rem 0',
              backgroundColor: `hsl(${item.id * 60}, 70%, 80%)`,
              borderRadius: '4px',
              borderLeft: `4px solid hsl(${item.id * 60}, 70%, 50%)`
            }}
          >
            Item {item.id + 1} (Delay: {item.delay}ms)
          </div>
        ))}
      </div>
    </div>
  );
}

function TimingFunctions() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState('ease');

  const timingFunctions = [
    { name: 'ease', value: 'ease' },
    { name: 'linear', value: 'linear' },
    { name: 'ease-in', value: 'ease-in' },
    { name: 'ease-out', value: 'ease-out' },
    { name: 'ease-in-out', value: 'ease-in-out' },
    { name: 'cubic-bezier', value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Timing Function: </label>
        <select 
          value={selectedFunction} 
          onChange={(e) => setSelectedFunction(e.target.value)}
          className="input"
        >
          {timingFunctions.map(func => (
            <option key={func.name} value={func.value}>
              {func.name}
            </option>
          ))}
        </select>
      </div>
      
      <button onClick={() => setIsAnimating(!isAnimating)} className="button">
        {isAnimating ? 'Reset' : 'Animate'}
      </button>
      
      <div
        style={{
          width: isAnimating ? '300px' : '50px',
          height: '50px',
          backgroundColor: '#9b59b6',
          transition: `width 2s ${selectedFunction}`,
          margin: '2rem 0',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px'
        }}
      >
        {selectedFunction}
      </div>
      
      <p>Watch how the animation progresses with different timing functions!</p>
    </div>
  );
}

function JSAnimations() {
  const [position, setPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    let currentPos = 0;
    const targetPos = 200;
    const duration = 1000; // 1 second
    const startTime = Date.now();

    const animateStep = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      currentPos = targetPos * easeOut;
      setPosition(currentPos);

      if (progress < 1) {
        requestAnimationFrame(animateStep);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animateStep);
  };

  const reset = () => {
    setPosition(0);
    setIsAnimating(false);
  };

  return (
    <div>
      <button onClick={animate} disabled={isAnimating} className="button">
        {isAnimating ? 'Animating...' : 'Start Animation'}
      </button>
      <button onClick={reset} className="button">Reset</button>
      
      <div style={{ marginTop: '2rem', position: 'relative', height: '100px' }}>
        <div
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#f39c12',
            borderRadius: '50%',
            position: 'absolute',
            left: `${position}px`,
            top: '25px',
            transition: isAnimating ? 'none' : 'left 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px'
          }}
        >
          JS
        </div>
      </div>
      
      <p>Position: {Math.round(position)}px</p>
    </div>
  );
}

export default AnimationExamples; 