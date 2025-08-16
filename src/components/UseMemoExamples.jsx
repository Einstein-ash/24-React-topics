import React, { useState, useMemo } from 'react';

const UseMemoExamples = () => {
  return (
    <div>
      <div className="explanation">
        <h3>🎯 useMemo Hook Overview</h3>
        <p>
          <strong>useMemo</strong> is a React Hook that memoizes the result of a computation. 
          It only recalculates the memoized value when one of its dependencies has changed, 
          which can help optimize performance by avoiding expensive calculations on every render.
        </p>
        <div className="code-block">
{`const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);

// JavaScript Concepts Used:
// 1. Memoization - Caching expensive calculations 
// 2. Dependency Arrays - Controlling when to recalculate
// 3. Arrow Functions - Function expressions
// 4. Performance Optimization - Avoiding unnecessary computations`}
        </div>
      </div>

      {/* Example 1: Expensive Calculation */}
      <div className="example">
        <h3>Example 1: Expensive Calculation Memoization</h3>
        <p>Memoizing a computationally expensive operation like factorial calculation.</p>
        <ExpensiveCalculation />
      </div>

      {/* Example 2: Filtered and Sorted Lists */}
      <div className="example">
        <h3>Example 2: Filtered and Sorted Lists</h3>
        <p>Memoizing filtered and sorted arrays to avoid recalculating on every render.</p>
        <FilteredList />
      </div>

      {/* Example 3: Complex Object Creation */}
      <div className="example">
        <h3>Example 3: Complex Object Creation</h3>
        <p>Memoizing complex object creation to prevent unnecessary re-renders of child components.</p>
        <ComplexObject />
      </div>

      {/* Example 4: API Data Transformation */}
      <div className="example">
        <h3>Example 4: API Data Transformation</h3>
        <p>Memoizing data transformation operations for API responses.</p>
        <DataTransformation />
      </div>

      <div className="js-concept">
        <h3>🔍 Key JavaScript Concepts Used in useMemo:</h3>
        <ul>
          <li><strong>Memoization:</strong> Caching expensive calculations</li>
          <li><strong>Dependency Arrays:</strong> Controlling when to recalculate</li>
          <li><strong>Arrow Functions:</strong> Function expressions</li>
          <li><strong>Performance Optimization:</strong> Avoiding unnecessary computations</li>
          <li><strong>Array Methods:</strong> filter(), sort(), map(), reduce()</li>
          <li><strong>Object Literals:</strong> Creating complex objects</li>
          <li><strong>Date API:</strong> new Date(), getHours(), toISOString()</li>
          <li><strong>Template Literals:</strong> String interpolation</li>
        </ul>
      </div>
    </div>
  );
};

// Static data outside components to prevent recreation
const staticItems = [
  { id: 1, name: 'Apple', price: 1.99, category: 'fruit' },
  { id: 2, name: 'Banana', price: 0.99, category: 'fruit' },
  { id: 3, name: 'Carrot', price: 0.50, category: 'vegetable' },
  { id: 4, name: 'Dragon Fruit', price: 5.99, category: 'fruit' },
  { id: 5, name: 'Eggplant', price: 2.49, category: 'vegetable' }
];

const staticApiData = [
  { id: 1, name: 'John', age: 25, department: 'Engineering', salary: 75000 },
  { id: 2, name: 'Jane', age: 30, department: 'Marketing', salary: 65000 },
  { id: 3, name: 'Bob', age: 35, department: 'Engineering', salary: 85000 },
  { id: 4, name: 'Alice', age: 28, department: 'HR', salary: 55000 }
];

// Example 1: Expensive Calculation
function ExpensiveCalculation() {
  const [number, setNumber] = useState(5);
  const [otherState, setOtherState] = useState(0);
  
  const factorial = useMemo(() => {
    console.log('Calculating factorial...');
    let result = 1;
    for (let i = 2; i <= number; i++) {
      result *= i;
    }
    return result;
  }, [number]);
  
  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
        min="0"
        max="20"
        className="input"
      />
      <p>Factorial of <strong>{number}</strong> is: <strong>{factorial}</strong></p>
      <p>Other state: {otherState}</p>
      <button onClick={() => setOtherState(otherState + 1)} className="button">
        Update Other State (won't recalculate factorial)
      </button>
      <p><small>Check console to see when factorial is recalculated!</small></p>
    </div>
  );
}

// Example 2: Filtered and Sorted Lists
function FilteredList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  const filteredAndSortedItems = useMemo(() => {
    console.log('Filtering and sorting...');
    
    const filtered = staticItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  }, [searchTerm, sortBy]);
  
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search items..."
        className="input"
      />
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input">
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
        <option value="category">Sort by Category</option>
      </select>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredAndSortedItems.map(item => (
          <li key={item.id} style={{ 
            padding: '0.5rem', 
            margin: '0.5rem 0', 
            border: '1px solid #ddd', 
            borderRadius: '4px' 
          }}>
            <strong>{item.name}</strong> - ${item.price} ({item.category})
          </li>
        ))}
      </ul>
      <p><small>Check console to see when filtering/sorting is recalculated!</small></p>
    </div>
  );
}

// Example 3: Complex Object Creation
function ComplexObject() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');
  
  const userPreferences = useMemo(() => {
    console.log('Creating user preferences object...');
    
    return {
      theme: theme,
      settings: {
        notifications: true,
        autoSave: true,
        language: 'en'
      },
      statistics: {
        totalActions: count,
        averagePerDay: count / 30,
        lastUpdated: new Date().toISOString()
      },
      isDarkMode: theme === 'dark',
      hasHighActivity: count > 100,
      getGreeting: () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning!';
        if (hour < 18) return 'Good afternoon!';
        return 'Good evening!';
      }
    };
  }, [count]);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)} className="button">Increment Count</button>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="button">
        Toggle Theme
      </button>
      
      <UserProfile preferences={userPreferences} />
    </div>
  );
}

// UserProfile component for Example 3
function UserProfile({ preferences }) {
  return (
    <div style={{ 
      padding: '1rem', 
      border: '1px solid #ddd', 
      borderRadius: '4px', 
      marginTop: '1rem',
      backgroundColor: preferences.isDarkMode ? '#333' : '#f9f9f9',
      color: preferences.isDarkMode ? '#fff' : '#333'
    }}>
      <h4>{preferences.getGreeting()}</h4>
      <p>Theme: {preferences.theme}</p>
      <p>Total Actions: {preferences.statistics.totalActions}</p>
      <p>Average Per Day: {preferences.statistics.averagePerDay.toFixed(2)}</p>
      <p>High Activity: {preferences.hasHighActivity ? 'Yes' : 'No'}</p>
      <p>Last Updated: {preferences.statistics.lastUpdated}</p>
    </div>
  );
}

// Example 4: API Data Transformation
function DataTransformation() {
  const [filterCriteria, setFilterCriteria] = useState('all');
  
  const transformedData = useMemo(() => {
    console.log('Transforming data...');
    
    let filtered = staticApiData;
    
    if (filterCriteria === 'engineering') {
      filtered = staticApiData.filter(user => user.department === 'Engineering');
    } else if (filterCriteria === 'senior') {
      filtered = staticApiData.filter(user => user.age > 30);
    } else if (filterCriteria === 'high-salary') {
      filtered = staticApiData.filter(user => user.salary > 70000);
    }
    
    const stats = {
      totalUsers: filtered.length,
      averageAge: filtered.reduce((sum, user) => sum + user.age, 0) / filtered.length || 0,
      averageSalary: filtered.reduce((sum, user) => sum + user.salary, 0) / filtered.length || 0,
      departments: [...new Set(filtered.map(user => user.department))]
    };
    
    return {
      users: filtered,
      statistics: stats,
      summary: `Showing ${filtered.length} users with average age ${stats.averageAge.toFixed(1)} and salary ${stats.averageSalary.toFixed(0)}`
    };
  }, [filterCriteria]);
  
  return (
    <div>
      <select value={filterCriteria} onChange={(e) => setFilterCriteria(e.target.value)} className="input">
        <option value="all">All Users</option>
        <option value="engineering">Engineering Only</option>
        <option value="senior">Senior (30+)</option>
        <option value="high-salary">High Salary (70k+)</option>
      </select>
      
      <h4>Summary</h4>
      <p>{transformedData.summary}</p>
      
      <h4>Statistics</h4>
      <ul>
        <li>Total Users: {transformedData.statistics.totalUsers}</li>
        <li>Average Age: {transformedData.statistics.averageAge.toFixed(1)}</li>
        <li>Average Salary: ${transformedData.statistics.averageSalary.toFixed(0)}</li>
        <li>Departments: {transformedData.statistics.departments.join(', ')}</li>
      </ul>
      
      <h4>Users</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {transformedData.users.map(user => (
          <li key={user.id} style={{ 
            padding: '0.5rem', 
            margin: '0.5rem 0', 
            border: '1px solid #ddd', 
            borderRadius: '4px' 
          }}>
            <strong>{user.name}</strong> - {user.age} years old - {user.department} - ${user.salary}
          </li>
        ))}
      </ul>
      <p><small>Check console to see when data transformation is recalculated!</small></p>
    </div>
  );
}

export default UseMemoExamples; 