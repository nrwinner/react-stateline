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
        <p>
          <p>
            <button onClick={this.clickEvent}>Container Button</button>
          </p>
          Some nested container component
          <div>
            'someValue': <span>{ this.props.someValue }</span>
          </div>
        </p>
      </div>
    )
  }
}

const Container = resolve(App_Store.getInstance(), 'someValue')(ContainerClass);

export default Container;