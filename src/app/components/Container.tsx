import React from 'react';
import App_Store from '../App.store';
import resolve from '../../store/resolve';


class ContainerClass extends React.Component<{ someValue?: string }> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        { this.props.someValue }
      </div>
    )
  }
}

// @ts-ignore
let Container = resolve(App_Store.getInstance(), 'someValue')(ContainerClass);

export default Container;