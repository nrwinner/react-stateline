import React from 'react';
import Parent from './components/Parent';
import App_Store from './App.store';


const App: React.FC = () => {
  const store = App_Store.getInstance();
  store.someValue = 'whoa';

  const clickEvent = () => {
    store.someValue = Math.random().toString();
  }
  
  return (
    <div>
      <Parent />

      <button onClick={ clickEvent }>Root Button Dawg</button>
    </div>
  );
}

export default App;
