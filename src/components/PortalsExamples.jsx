import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const PortalsExamples = () => (
  <div>
    <div className="explanation">
      <h3>🎯 Portals Overview</h3>
      <p>Portals let you render children into a DOM node outside the parent component hierarchy. Useful for modals, tooltips, notifications, etc.</p>
      <div className="code-block">
{`createPortal(child, container)

// JavaScript Concepts:
// 1. DOM Manipulation - Selecting DOM nodes
// 2. Event Bubbling - Events propagate through portal
// 3. Conditional Rendering - Show/hide portal content
// 4. useEffect - Cleanup on unmount`}
      </div>
    </div>
    <div className="example">
      <h3>Example 1: Modal with Portal</h3>
      <ModalPortalExample />
    </div>
    <div className="example">
      <h3>Example 2: Tooltip with Portal</h3>
      <TooltipPortalExample />
    </div>
    <div className="example">
      <h3>Example 3: Context Menu with Portal</h3>
      <ContextMenuPortalExample />
    </div>
    <div className="example">
      <h3>Example 4: Notification with Portal</h3>
      <NotificationPortalExample />
    </div>
    <div className="js-concept">
      <h3>🔍 Key JavaScript Concepts Used in Portals:</h3>
      <ul>
        <li><strong>DOM Manipulation:</strong> document.getElementById, createElement</li>
        <li><strong>Event Bubbling:</strong> Events propagate through portal</li>
        <li><strong>Conditional Rendering:</strong> Show/hide portal content</li>
        <li><strong>useEffect:</strong> Cleanup on unmount</li>
      </ul>
    </div>
  </div>
);

function ModalPortalExample() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)} className="button">Open Modal</button>
      {open && <Modal onClose={() => setOpen(false)}><h3>Modal via Portal</h3><p>This modal is rendered outside the parent DOM tree.</p></Modal>}
    </div>
  );
}
function Modal({ children, onClose }) {
  return createPortal(
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', minWidth: '300px' }}>
        {children}
        <button onClick={onClose} className="button">Close</button>
      </div>
    </div>,
    document.body
  );
}
function TooltipPortalExample() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="button">Hover me</button>
      {show && createPortal(
        <div style={{ position: 'fixed', top: 100, left: 200, background: '#333', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', zIndex: 1001 }}>Tooltip via Portal</div>,
        document.body
      )}
    </div>
  );
}
function ContextMenuPortalExample() {
  const [pos, setPos] = useState(null);
  const handleContextMenu = e => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };
  const close = () => setPos(null);
  return (
    <div onContextMenu={handleContextMenu} style={{ border: '1px solid #ddd', padding: '2rem', borderRadius: '8px' }}>
      Right-click inside this box
      {pos && createPortal(
        <div style={{ position: 'fixed', top: pos.y, left: pos.x, background: '#fff', border: '1px solid #333', borderRadius: '4px', padding: '0.5rem', zIndex: 1002 }}>
          <p>Context Menu</p>
          <button onClick={close} className="button">Close</button>
        </div>,
        document.body
      )}
    </div>
  );
}
function NotificationPortalExample() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [show]);
  return (
    <div>
      <button onClick={() => setShow(true)} className="button">Show Notification</button>
      {show && createPortal(
        <div style={{ position: 'fixed', top: 20, right: 20, background: '#27ae60', color: '#fff', padding: '1rem', borderRadius: '4px', zIndex: 1003 }}>
          Notification via Portal!
        </div>,
        document.body
      )}
    </div>
  );
}

export default PortalsExamples; 