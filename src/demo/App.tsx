import React from 'react';
import Parent from './components/Parent';
import App_Store from './App.store';
import './App.scss';


const App: React.FC = () => {
  const store = App_Store.getInstance();
  store.someValue = 'whoa';

  const clickEvent = () => {
    store.someValue = Math.random().toString();
  }
  
  return (
    <div>
      <p>
        <button onClick={ clickEvent }>Root Button</button>
      </p>
      <Parent />
    </div>
  );
}

export default App;
