import React, { useState, useEffect, useCallback } from "react";

const CustomHooksExamples = () => {
  return (
    <div>
      <div className="explanation">
        <h3>🎯 Custom Hooks Overview</h3>
        <p>
          <strong>Custom Hooks</strong> are JavaScript functions that start with
          "use" and may call other React Hooks. They allow you to extract
          component logic into reusable functions, making your code more modular
          and easier to test.
        </p>
        <div className="code-block">
          {`// Custom Hook Pattern
function useCustomHook(initialValue) {
  const [state, setState] = useState(initialValue);
  
  // Custom logic here
  
  return [state, setState];
}

// JavaScript Concepts Used:
// 1. Function Composition - Combining multiple hooks
// 2. State Management - Managing local state
// 3. Side Effects - Handling external interactions
// 4. Return Values - Providing data and functions to components`}
        </div>
      </div>

      {/* Example 1: useLocalStorage Hook */}
      <div className="example">
        <h3>Example 1: useLocalStorage Hook</h3>
        <p>Custom hook for managing state that persists in localStorage.</p>
        <LocalStorageExample />
        <div className="code-block">
          {`function useLocalStorage(key, initialValue) {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });
  
  // Update localStorage when state changes
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue];
}

// JavaScript Concepts:
// - localStorage API: getItem, setItem
// - JSON.parse/stringify: Serializing data
// - Try/Catch: Error handling
// - Function instanceof: Checking function types`}
        </div>
      </div>

      {/* Example 2: useFetch Hook */}
      <div className="example">
        <h3>Example 2: useFetch Hook</h3>
        <p>Custom hook for making API calls with loading and error states.</p>
        <FetchExample />
        <div className="code-block">
          {`function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, error, refetch: fetchData };
}

// JavaScript Concepts:
// - Async/Await: Handling asynchronous operations
// - Fetch API: Making HTTP requests
// - Error Handling: Try/catch blocks
// - Response.ok: Checking HTTP status`}
        </div>
      </div>

      {/* Example 3: useWindowSize Hook */}
      <div className="example">
        <h3>Example 3: useWindowSize Hook</h3>
        <p>
          Custom hook for tracking window dimensions with debounced updates.
        </p>
        <WindowSizeExample />
        <div className="code-block">
          {`function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    let timeoutId = null;
    
    const handleResize = () => {
      // Debounce the resize event
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);
  
  return windowSize;
}

// JavaScript Concepts:
// - Event Listeners: addEventListener, removeEventListener
// - setTimeout/clearTimeout: Debouncing
// - Window API: innerWidth, innerHeight
// - Cleanup Functions: Preventing memory leaks`}
        </div>
      </div>

      {/* Example 4: useForm Hook */}
      <div className="example">
        <h3>Example 4: useForm Hook</h3>
        <p>
          Custom hook for form management with validation and submission
          handling.
        </p>
        <FormExample />
        <div className="code-block">
          {`function useForm(initialValues = {}, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);
  
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    if (validationRules[name]) {
      const error = validationRules[name](values[name]);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [validationRules, values]);
  
  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(validationRules).forEach(field => {
      const error = validationRules[field](values[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validationRules, values]);
  
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    
    if (validateForm()) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [validateForm, values]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues
  };
}

// JavaScript Concepts:
// - Object.keys(): Getting object property names
// - Async Functions: Handling form submission
// - Computed Properties: Dynamic property names
// - Conditional Logic: Form validation`}
        </div>
      </div>

      <div className="js-concept">
        <h3>🔍 Key JavaScript Concepts Used in Custom Hooks:</h3>
        <ul>
          <li>
            <strong>Function Composition:</strong> Combining multiple React
            hooks into custom logic
          </li>
          <li>
            <strong>State Management:</strong> Managing local state with
            useState
          </li>
          <li>
            <strong>Side Effects:</strong> Handling external interactions with
            useEffect
          </li>
          <li>
            <strong>Async/Await:</strong> Handling asynchronous operations in
            hooks
          </li>
          <li>
            <strong>Error Handling:</strong> Try/catch blocks for robust error
            management
          </li>
          <li>
            <strong>Event Listeners:</strong> addEventListener,
            removeEventListener for DOM events
          </li>
          <li>
            <strong>localStorage API:</strong> Persistent storage in the browser
          </li>
          <li>
            <strong>JSON Methods:</strong> parse() and stringify() for data
            serialization
          </li>
          <li>
            <strong>Fetch API:</strong> Making HTTP requests from hooks
          </li>
          <li>
            <strong>Debouncing:</strong> setTimeout/clearTimeout for performance
            optimization
          </li>
          <li>
            <strong>Object Methods:</strong> Object.keys() for iteration and
            validation
          </li>
          <li>
            <strong>Computed Properties:</strong> Dynamic property names with
            bracket notation
          </li>
          <li>
            <strong>Function Types:</strong> instanceof Function for type
            checking
          </li>
          <li>
            <strong>Cleanup Functions:</strong> Preventing memory leaks in
            useEffect
          </li>
        </ul>
      </div>
    </div>
  );
};

// Custom Hook implementations
function useLocalStorage(key, initialValue) {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error("Error setting localStorage:", error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      // Debounce the resize event
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return windowSize;
}

function useForm(initialValues = {}, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (name, value) => {
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (name) => {
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate on blur
      if (validationRules[name]) {
        const error = validationRules[name](values[name]);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validationRules, values]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field](values[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validationRules, values]);

  const handleSubmit = useCallback(
    async (onSubmit) => {
      setIsSubmitting(true);

      if (validateForm()) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error("Form submission error:", error);
        }
      }
      setIsSubmitting(false);
    },
    [validateForm, values]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  };
}

// Component implementations
function LocalStorageExample() {
  const [name, setName] = useLocalStorage("userName", "");
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [count, setCount] = useLocalStorage("count", 0);

  return (
    <div>
      <h4>LocalStorage Hook Example</h4>

      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <p>Stored name: {name}</p>
      </div>

      <div>
        <label>Theme: </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="input"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <p>Current theme: {theme}</p>
      </div>

      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)} className="button">
          Increment
        </button>
        <button onClick={() => setCount(0)} className="button">
          Reset
        </button>
      </div>

      <p>
        <small>Try refreshing the page - the values will persist!</small>
      </p>
    </div>
  );
}

function FetchExample() {
  const [userId, setUserId] = useState(1);
  const { data, loading, error, refetch } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  return (
    <div>
      <h4>Fetch Hook Example</h4>

      <input
        type="number"
        value={userId}
        onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
        min="1"
        max="10"
        className="input"
      />
      <button onClick={refetch} className="button">
        Refetch
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "#e74c3c" }}>Error: {error}</p>}
      {data && (
        <div
          style={{
            padding: "1rem",
            border: "1px solid #ddd",
            marginTop: "1rem",
          }}
        >
          <h5>{data.name}</h5>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
          <p>Company: {data.company?.name}</p>
        </div>
      )}
    </div>
  );
}

function WindowSizeExample() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <h4>Window Size Hook Example</h4>

      <div
        style={{
          padding: "1rem",
          border: "1px solid #ddd",
          marginTop: "1rem",
          backgroundColor: "#f8f9fa",
        }}
      >
        <p>
          <strong>Window Dimensions:</strong>
        </p>
        <p>Width: {width}px</p>
        <p>Height: {height}px</p>
        <p>Aspect Ratio: {(width / height).toFixed(2)}</p>
      </div>

      <p>
        <small>Try resizing your browser window to see the updates!</small>
      </p>
    </div>
  );
}

function FormExample() {
  const validationRules = {
    name: (value) => (!value.trim() ? "Name is required" : ""),
    email: (value) => (!value.includes("@") ? "Valid email is required" : ""),
    password: (value) =>
      value.length < 6 ? "Password must be at least 6 characters" : "",
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({ name: "", email: "", password: "" }, validationRules);

  const onSubmit = async (formData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div>
      <h4>Form Hook Example</h4>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}
      >
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            className="input"
          />
          {touched.name && errors.name && (
            <p style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label>Email: </label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className="input"
          />
          {touched.email && errors.email && (
            <p style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={values.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            className="input"
          />
          {touched.password && errors.password && (
            <p style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
              {errors.password}
            </p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className="button">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CustomHooksExamples;
