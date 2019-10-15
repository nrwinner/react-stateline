import React from 'react';
import { ReactStore } from './store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
/**
 * This function takes a store and a list of property names to resolve from that store and provides them as props. It returns another function
 * that takes a React Component (instance of React.ComponentClass or React.FunctionalComponent).
 *
 * @export
 * @param {ReactStore} Store
 * @param {...string[]} propNames
 */
export default function resolve(Store: ReactStore, ...propNames: string[]): (Source: React.ComponentClass | React.FunctionComponent) => any {
  
  return (Source: React.ComponentClass | React.FunctionComponent) => {

    return class extends React.Component {
      destroyed$ = new Subject<void>();
      mounted = false;

      data = Store.get(...propNames);
      state: { [key: string]: any } = {};
      queuedStateChanges: { [key: string]: any }[] = [];
      
      constructor(props: any) {
        super(props)

        // subscribe to the overall props BehaviorSubject to handle the instantiation of new state properties
        this.data.pipe(takeUntil(this.destroyed$)).subscribe((data: any) => {
          for (let item in data) {
            // subscribe to the BehaviorSubject for each prop and, if it changes, setState
            data[item].pipe(takeUntil(this.destroyed$)).subscribe((val: any) => {
              if (this.mounted) {
                // if the component has successfully mounted, go ahead and setState
                this.setState({ [item]: val });
              } else {
                // otherwise, queue the changes for after the component has finished mounting
                this.queuedStateChanges.push({ [item]: val })
              }
            });
          }
        });
      }

      componentDidMount() {
        this.mounted = true;

        // the component has successfully mounted now, if we have any queued changes we can process them safely
        if (this,this.queuedStateChanges.length) {
          for (let change of this.queuedStateChanges) {
            this.setState(change);
          }
        }
      }

      componentWillUnmount() {
        // when the component is destroyed, unsubscribe from open observables
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
      }
  
      render() {
        return (
          <Source {...this.state} />
        );
      }
    }
  }
}