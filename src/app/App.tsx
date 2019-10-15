import React from 'react';
import Container from './components/Container';
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
      <Container />
      <Parent />

      <button onClick={ clickEvent } />
    </div>
  );
}

export default App;
