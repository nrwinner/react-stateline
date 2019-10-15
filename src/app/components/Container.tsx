import React from 'react';
import App_Store from '../App.store';
import resolve from '../../store/resolve';


class ContainerClass extends React.Component<{ someValue?: string }> {

  constructor(props: any) {
    super(props);
  }

  clickEvent() {
    App_Store.getInstance().someValue = Math.random().toString();
  }

  render() {
    return (
      <div>
        { this.props.someValue }
        <button onClick={this.clickEvent}>Container Button Dawg</button>
      </div>
    )
  }
}

const Container = resolve(App_Store.getInstance(), 'someValue')(ContainerClass);

export default Container;