import React, { useState } from 'react';

const PropsExamples = () => {
  return (
    <div>
      <div className="explanation">
        <h3>🎯 Props Overview</h3>
        <p>
          <strong>Props</strong> (short for "properties") are a way to pass data from parent components to child components. 
          They are read-only and help make components reusable and configurable.
        </p>
        <div className="code-block">
{`// Props Pattern
function ChildComponent(props) {
  return <div>{props.message}</div>;
}

// Or with destructuring
function ChildComponent({ message, count, onAction }) {
  return <div>{message} - Count: {count}</div>;
}

// JavaScript Concepts Used:
// 1. Object Destructuring - Extracting properties from props
// 2. Default Parameters - Providing fallback values
// 3. Function Parameters - Receiving data from parent
// 4. Conditional Rendering - Showing content based on props`}
        </div>
      </div>

      {/* Example 1: Basic Props */}
      <div className="example">
        <h3>Example 1: Basic Props</h3>
        <p>Simple props passing with different data types.</p>
        <BasicProps />
        <div className="code-block">
{`function BasicProps() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Greeting 
        name="John" 
        age={25} 
        isActive={true} 
        hobbies={['reading', 'coding', 'gaming']}
        onIncrement={() => setCount(count + 1)}
      />
      <p>Count: {count}</p>
    </div>
  );
}

function Greeting({ name, age, isActive, hobbies, onIncrement }) {
  return (
    <div>
      <h3>Hello, {name}!</h3>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <p>Hobbies: {hobbies.join(', ')}</p>
      <button onClick={onIncrement}>Increment Count</button>
    </div>
  );
}

// JavaScript Concepts:
// - Object Destructuring: { name, age, isActive }
// - Array Methods: join() for string conversion
// - Ternary Operators: Conditional rendering
// - Function Props: Passing callbacks`}
        </div>
      </div>

      {/* Example 2: Props with Default Values */}
      <div className="example">
        <h3>Example 2: Props with Default Values</h3>
        <p>Using default parameters and conditional rendering with props.</p>
        <DefaultProps />
        <div className="code-block">
{`function DefaultProps() {
  return (
    <div>
      <UserCard 
        name="Alice"
        role="Developer"
        avatar="https://via.placeholder.com/100"
      />
      <UserCard 
        name="Bob"
        // role and avatar will use defaults
      />
      <UserCard 
        name="Charlie"
        role="Designer"
        showDetails={true}
      />
    </div>
  );
}

function UserCard({ 
  name, 
  role = 'User', 
  avatar = 'https://via.placeholder.com/100?text=U',
  showDetails = false 
}) {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '1rem', 
      margin: '1rem 0',
      borderRadius: '8px'
    }}>
      <img src={avatar} alt={name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      <h4>{name}</h4>
      <p>Role: {role}</p>
      {showDetails && (
        <div>
          <p>Email: {name.toLowerCase()}@example.com</p>
          <p>Department: Engineering</p>
        </div>
      )}
    </div>
  );
}

// JavaScript Concepts:
// - Default Parameters: role = 'User'
// - Conditional Rendering: {showDetails && ...}
// - Template Literals: String interpolation
// - String Methods: toLowerCase()`}
        </div>
      </div>

      {/* Example 3: Props with Children */}
      <div className="example">
        <h3>Example 3: Props with Children</h3>
        <p>Using the children prop to create wrapper components.</p>
        <ChildrenProps />
        <div className="code-block">
{`function ChildrenProps() {
  return (
    <div>
      <Card title="User Information">
        <p>This is the content inside the card.</p>
        <button>Action Button</button>
      </Card>
      
      <Card title="Product Details" theme="dark">
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </Card>
      
      <Modal isOpen={true} onClose={() => alert('Modal closed')}>
        <h3>Modal Content</h3>
        <p>This content is passed as children to the Modal component.</p>
      </Modal>
    </div>
  );
}

function Card({ title, children, theme = 'light' }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333'
    }}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '500px'
      }}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// JavaScript Concepts:
// - Children Prop: React's special prop for nested content
// - Conditional Rendering: if (!isOpen) return null
// - CSS-in-JS: Inline styles for theming
// - Event Handlers: onClick for user interactions`}
        </div>
      </div>

      {/* Example 4: Props with Complex Data */}
      <div className="example">
        <h3>Example 4: Props with Complex Data</h3>
        <p>Passing complex objects and arrays as props with proper handling.</p>
        <ComplexProps />
        <div className="code-block">
{`function ComplexProps() {
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    profile: {
      avatar: 'https://via.placeholder.com/150',
      bio: 'Full-stack developer with 5 years of experience',
      skills: ['React', 'Node.js', 'Python', 'MongoDB']
    },
    posts: [
      { id: 1, title: 'Getting Started with React', likes: 42 },
      { id: 2, title: 'Advanced JavaScript Patterns', likes: 28 },
      { id: 3, title: 'CSS Grid Layout Guide', likes: 35 }
    ]
  };
  
  const theme = {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#f8f9fa',
    text: '#2c3e50'
  };
  
  return (
    <div>
      <UserProfile user={user} theme={theme} />
      <PostList posts={user.posts} onLike={(postId) => console.log('Liked post:', postId)} />
    </div>
  );
}

function UserProfile({ user, theme }) {
  const { name, email, profile } = user;
  
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      backgroundColor: theme.background
    }}>
      <img src={profile.avatar} alt={name} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <h3 style={{ color: theme.text }}>{name}</h3>
      <p style={{ color: theme.text }}>{email}</p>
      <p>{profile.bio}</p>
      <div>
        <strong>Skills:</strong>
        {profile.skills.map((skill, index) => (
          <span key={index} style={{
            backgroundColor: theme.primary,
            color: 'white',
            padding: '0.25rem 0.5rem',
            margin: '0.25rem',
            borderRadius: '4px',
            fontSize: '0.8rem'
          }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function PostList({ posts, onLike }) {
  return (
    <div>
      <h3>Posts</h3>
      {posts.map(post => (
        <div key={post.id} style={{
          border: '1px solid #ddd',
          padding: '1rem',
          margin: '0.5rem 0',
          borderRadius: '4px'
        }}>
          <h4>{post.title}</h4>
          <p>Likes: {post.likes}</p>
          <button onClick={() => onLike(post.id)}>Like</button>
        </div>
      ))}
    </div>
  );
}

// JavaScript Concepts:
// - Object Destructuring: { name, email, profile } = user
// - Array Methods: map() for rendering lists
// - Nested Objects: Accessing profile.avatar
// - Key Prop: React's requirement for list items`}
        </div>
      </div>

      <div className="js-concept">
        <h3>🔍 Key JavaScript Concepts Used in Props:</h3>
        <ul>
          <li><strong>Object Destructuring:</strong> Extracting properties from props objects</li>
          <li><strong>Default Parameters:</strong> Providing fallback values for optional props</li>
          <li><strong>Array Methods:</strong> map(), join() for data transformation</li>
          <li><strong>String Methods:</strong> toLowerCase(), includes() for text processing</li>
          <li><strong>Template Literals:</strong> String interpolation with variables</li>
          <li><strong>Ternary Operators:</strong> Conditional expressions for rendering</li>
          <li><strong>Logical Operators:</strong> && for conditional rendering</li>
          <li><strong>Function Props:</strong> Passing callbacks from parent to child</li>
          <li><strong>Children Prop:</strong> React's special prop for nested content</li>
          <li><strong>Nested Objects:</strong> Accessing properties of complex data structures</li>
          <li><strong>Key Prop:</strong> React's requirement for unique identifiers in lists</li>
          <li><strong>Event Handling:</strong> onClick and other event handlers</li>
          <li><strong>Conditional Rendering:</strong> Showing/hiding content based on props</li>
        </ul>
      </div>
    </div>
  );
};

// Component implementations
function BasicProps() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Greeting 
        name="John" 
        age={25} 
        isActive={true} 
        hobbies={['reading', 'coding', 'gaming']}
        onIncrement={() => setCount(count + 1)}
      />
      <p>Count: <strong>{count}</strong></p>
    </div>
  );
}

function Greeting({ name, age, isActive, hobbies, onIncrement }) {
  return (
    <div style={{ 
      padding: '1rem', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      marginBottom: '1rem'
    }}>
      <h3>Hello, {name}!</h3>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
      <p>Hobbies: {hobbies.join(', ')}</p>
      <button onClick={onIncrement} className="button">Increment Count</button>
    </div>
  );
}

function DefaultProps() {
  return (
    <div>
      <UserCard 
        name="Alice"
        role="Developer"
        avatar="https://via.placeholder.com/100"
      />
      <UserCard 
        name="Bob"
        // role and avatar will use defaults
      />
      <UserCard 
        name="Charlie"
        role="Designer"
        showDetails={true}
      />
    </div>
  );
}

function UserCard({ 
  name, 
  role = 'User', 
  avatar = 'https://via.placeholder.com/100?text=U',
  showDetails = false 
}) {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '1rem', 
      margin: '1rem 0',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <img src={avatar} alt={name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
      <div>
        <h4>{name}</h4>
        <p>Role: {role}</p>
        {showDetails && (
          <div>
            <p>Email: {name.toLowerCase()}@example.com</p>
            <p>Department: Engineering</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ChildrenProps() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <Card title="User Information">
        <p>This is the content inside the card.</p>
        <button className="button">Action Button</button>
      </Card>
      
      <Card title="Product Details" theme="dark">
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </Card>
      
      <button onClick={() => setIsModalOpen(true)} className="button">Open Modal</button>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Modal Content</h3>
        <p>This content is passed as children to the Modal component.</p>
        <button onClick={() => setIsModalOpen(false)} className="button">Close</button>
      </Modal>
    </div>
  );
}

function Card({ title, children, theme = 'light' }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333'
    }}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        {children}
      </div>
    </div>
  );
}

function ComplexProps() {
  const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    profile: {
      avatar: 'https://via.placeholder.com/150',
      bio: 'Full-stack developer with 5 years of experience',
      skills: ['React', 'Node.js', 'Python', 'MongoDB']
    },
    posts: [
      { id: 1, title: 'Getting Started with React', likes: 42 },
      { id: 2, title: 'Advanced JavaScript Patterns', likes: 28 },
      { id: 3, title: 'CSS Grid Layout Guide', likes: 35 }
    ]
  };
  
  const theme = {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#f8f9fa',
    text: '#2c3e50'
  };
  
  return (
    <div>
      <UserProfile user={user} theme={theme} />
      <PostList posts={user.posts} onLike={(postId) => console.log('Liked post:', postId)} />
    </div>
  );
}

function UserProfile({ user, theme }) {
  const { name, email, profile } = user;
  
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      backgroundColor: theme.background
    }}>
      <img src={profile.avatar} alt={name} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
      <h3 style={{ color: theme.text }}>{name}</h3>
      <p style={{ color: theme.text }}>{email}</p>
      <p>{profile.bio}</p>
      <div>
        <strong>Skills:</strong>
        {profile.skills.map((skill, index) => (
          <span key={index} style={{
            backgroundColor: theme.primary,
            color: 'white',
            padding: '0.25rem 0.5rem',
            margin: '0.25rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            display: 'inline-block'
          }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function PostList({ posts, onLike }) {
  return (
    <div>
      <h3>Posts</h3>
      {posts.map(post => (
        <div key={post.id} style={{
          border: '1px solid #ddd',
          padding: '1rem',
          margin: '0.5rem 0',
          borderRadius: '4px'
        }}>
          <h4>{post.title}</h4>
          <p>Likes: {post.likes}</p>
          <button onClick={() => onLike(post.id)} className="button">Like</button>
        </div>
      ))}
    </div>
  );
}

export default PropsExamples; 