import React from 'react';
import resolve from '../../store/resolve';
import App_Store from '../App.store';
import Container from '../components/Container';

let Child: React.FC<{ someValue?: string }> = (props) => {
  return (
    <div className="child">
      Child
      <div>
        { props.someValue }
        <Container />
      </div>
    </div>
  )
}

Child = resolve(App_Store.getInstance(), 'someValue')(Child);

export default Child;