import React, { createContext, useContext, useState } from 'react';

const UseContextExamples = () => {
  return (
    <div>
      <div className="explanation">
        <h3>🎯 useContext Hook Overview</h3>
        <p>
          <strong>useContext</strong> is a React Hook that lets you consume values from React Context. 
          It provides a way to pass data through the component tree without having to pass props down manually at every level.
        </p>
        <div className="code-block">
{`// Create a context
const MyContext = createContext();

// Provide value
<MyContext.Provider value={someValue}>
  <ChildComponent />
</MyContext.Provider>

// Consume value
const value = useContext(MyContext);

// JavaScript Concepts Used:
// 1. Context API - React's built-in state management
// 2. Provider Pattern - Providing data to child components
// 3. Consumer Pattern - Consuming data from parent components
// 4. Object Destructuring - Extracting values from context`}
        </div>
      </div>

      {/* Example 1: Basic Theme Context */}
      <div className="example">
        <h3>Example 1: Basic Theme Context</h3>
        <p>Simple theme switching with light and dark modes.</p>
        <ThemeContextExample />
        <div className="code-block">
{`// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer Component
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? '#333' : '#fff',
        color: theme === 'light' ? '#fff' : '#333'
      }}
    >
      Current Theme: {theme}
    </button>
  );
}

// JavaScript Concepts:
// - Object Destructuring: { theme, toggleTheme }
// - Ternary Operators: theme === 'light' ? 'dark' : 'light'
// - Template Literals: String interpolation`}
        </div>
      </div>

      {/* Example 2: User Authentication Context */}
      <div className="example">
        <h3>Example 2: User Authentication Context</h3>
        <p>Managing user authentication state across the app.</p>
        <AuthContextExample />
        <div className="code-block">
{`// Create Auth Context
const AuthContext = createContext();

// Auth Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const login = async (email, password) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ id: 1, email, name: 'John Doe' });
    setIsLoading(false);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Login Component
function LoginForm() {
  const { login, isLoading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// JavaScript Concepts:
// - Async/Await: Handling asynchronous operations
// - Promise: Simulating API calls
// - Event Handling: Form submission
// - Conditional Rendering: Loading states`}
        </div>
      </div>

      {/* Example 3: Shopping Cart Context */}
      <div className="example">
        <h3>Example 3: Shopping Cart Context</h3>
        <p>Managing shopping cart state with add, remove, and total calculation.</p>
        <CartContextExample />
        <div className="code-block">
{`// Create Cart Context
const CartContext = createContext();

// Cart Provider
function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };
  
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      getTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
}

// JavaScript Concepts:
// - Array Methods: find(), map(), filter(), reduce()
// - Spread Operator: ...item for object copying
// - Math.max(): Ensuring non-negative quantities
// - Arrow Functions: Concise function syntax`}
        </div>
      </div>

      {/* Example 4: Language/Localization Context */}
      <div className="example">
        <h3>Example 4: Language/Localization Context</h3>
        <p>Managing multiple languages and translations across the app.</p>
        <LanguageContextExample />
        <div className="code-block">
{`// Create Language Context
const LanguageContext = createContext();

// Translations object
const translations = {
  en: {
    greeting: 'Hello',
    welcome: 'Welcome to our app',
    button: 'Click me',
    language: 'Language'
  },
  es: {
    greeting: 'Hola',
    welcome: 'Bienvenido a nuestra aplicación',
    button: 'Haz clic',
    language: 'Idioma'
  },
  fr: {
    greeting: 'Bonjour',
    welcome: 'Bienvenue dans notre application',
    button: 'Cliquez-moi',
    language: 'Langue'
  }
};

// Language Provider
function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  
  const t = (key) => {
    return translations[language][key] || key;
  };
  
  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };
  
  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// JavaScript Concepts:
// - Object Access: translations[language][key]
// - Default Values: || key for fallback
// - Object Properties: Accessing nested object properties
// - Conditional Logic: if (translations[newLanguage])`}
        </div>
      </div>

      <div className="js-concept">
        <h3>🔍 Key JavaScript Concepts Used in useContext:</h3>
        <ul>
          <li><strong>Context API:</strong> React's built-in state management system</li>
          <li><strong>Provider Pattern:</strong> Providing data to component trees</li>
          <li><strong>Consumer Pattern:</strong> Consuming data from context</li>
          <li><strong>Object Destructuring:</strong> Extracting values from context objects</li>
          <li><strong>Array Methods:</strong> find(), map(), filter(), reduce() for data manipulation</li>
          <li><strong>Spread Operator:</strong> ... for object and array copying</li>
          <li><strong>Ternary Operators:</strong> Conditional expressions</li>
          <li><strong>Async/Await:</strong> Handling asynchronous operations</li>
          <li><strong>Promise:</strong> Simulating API calls and delays</li>
          <li><strong>Object Access:</strong> Accessing nested object properties</li>
          <li><strong>Event Handling:</strong> Form submissions and button clicks</li>
          <li><strong>Conditional Logic:</strong> if statements for validation</li>
        </ul>
      </div>
    </div>
  );
};

// Context definitions
const ThemeContext = createContext();
const AuthContext = createContext();
const CartContext = createContext();
const LanguageContext = createContext();

// Theme Context Example
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '20px',
        borderRadius: '8px',
        margin: '10px 0'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme}
      className="button"
      style={{
        backgroundColor: theme === 'light' ? '#333' : '#fff',
        color: theme === 'light' ? '#fff' : '#333',
        border: '2px solid #333'
      }}
    >
      Current Theme: {theme}
    </button>
  );
}

// Auth Context Example
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const login = async (email, password) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ id: 1, email, name: 'John Doe' });
    setIsLoading(false);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

function LoginForm() {
  const { login, isLoading } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input"
      />
      <button type="submit" disabled={isLoading} className="button">
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

function UserInfo() {
  const { user, logout } = useContext(AuthContext);
  
  if (!user) return <p>Please log in</p>;
  
  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <p>Email: {user.email}</p>
      <button onClick={logout} className="button">Logout</button>
    </div>
  );
}

// Cart Context Example
function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };
  
  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      getTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
}

function ProductList() {
  const { addToCart } = useContext(CartContext);
  
  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
  ];
  
  return (
    <div>
      <h4>Products:</h4>
      {products.map(product => (
        <div key={product.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ddd' }}>
          <p>{product.name} - ${product.price}</p>
          <button onClick={() => addToCart(product)} className="button">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

function CartDisplay() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useContext(CartContext);
  
  return (
    <div>
      <h4>Cart ({cart.length} items):</h4>
      {cart.map(item => (
        <div key={item.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ddd' }}>
          <p>{item.name} - ${item.price}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
            min="0"
            className="input"
            style={{ width: '60px' }}
          />
          <button onClick={() => removeFromCart(item.id)} className="button">Remove</button>
        </div>
      ))}
      <p><strong>Total: ${getTotal()}</strong></p>
    </div>
  );
}

// Language Context Example
function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  
  const translations = {
    en: {
      greeting: 'Hello',
      welcome: 'Welcome to our app',
      button: 'Click me',
      language: 'Language'
    },
    es: {
      greeting: 'Hola',
      welcome: 'Bienvenido a nuestra aplicación',
      button: 'Haz clic',
      language: 'Idioma'
    },
    fr: {
      greeting: 'Bonjour',
      welcome: 'Bienvenue dans notre application',
      button: 'Cliquez-moi',
      language: 'Langue'
    }
  };
  
  const t = (key) => {
    return translations[language][key] || key;
  };
  
  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };
  
  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

function LanguageSelector() {
  const { language, changeLanguage } = useContext(LanguageContext);
  
  return (
    <div>
      <select value={language} onChange={(e) => changeLanguage(e.target.value)} className="input">
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
}

function TranslatedContent() {
  const { t } = useContext(LanguageContext);
  
  return (
    <div>
      <h3>{t('greeting')}</h3>
      <p>{t('welcome')}</p>
      <button className="button">{t('button')}</button>
    </div>
  );
}

// Main example components
function ThemeContextExample() {
  return (
    <ThemeProvider>
      <h4>Theme Context Example</h4>
      <ThemedButton />
      <p>This content adapts to the current theme!</p>
    </ThemeProvider>
  );
}

function AuthContextExample() {
  return (
    <AuthProvider>
      <h4>Authentication Context Example</h4>
      <UserInfo />
      <LoginForm />
    </AuthProvider>
  );
}

function CartContextExample() {
  return (
    <CartProvider>
      <h4>Shopping Cart Context Example</h4>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <ProductList />
        <CartDisplay />
      </div>
    </CartProvider>
  );
}

function LanguageContextExample() {
  return (
    <LanguageProvider>
      <h4>Language Context Example</h4>
      <LanguageSelector />
      <TranslatedContent />
    </LanguageProvider>
  );
}

export default UseContextExamples; 