import React from 'react';
import Child from './Child'
import resolve from '../../store/resolve';
import App_Store from '../App.store';


let Parent: React.FC<{ someValue?: string }> = (props) => {
  return (
    <div className="parent">
      Big Test
      <div>
        { props.someValue }
      </div>
      <Child />
    </div>
  )
}

Parent = resolve(App_Store.getInstance(), 'someValue')(Parent);

export default Parent;