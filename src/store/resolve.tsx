import React from 'react';
import { ReactStore } from './store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export default function resolve(Store: ReactStore, ...propNames: string[]): (Source: React.Component | React.FC) => any {
  return (Source: React.Component<any> | React.FC) => {

    return class extends React.Component {
      destroyed$ = new Subject<void>();
      mounted = false;

      data = Store.get(...propNames);
      state: { [key: string]: any } = {};

      queuedStateChanges: { [key: string]: any }[] = [];
      
      constructor(props: any) {
        super(props)

        this.data.pipe(takeUntil(this.destroyed$)).subscribe((data: any) => {
          for (let item in data) {
            data[item].pipe(takeUntil(this.destroyed$)).subscribe((val: any) => {
              if (this.mounted) {
                this.setState({ [item]: val });
              } else {
                this.queuedStateChanges.push({ [item]: val })
              }
            });
          }
        });
      }

      componentDidMount() {
        this.mounted = true;

        if (this,this.queuedStateChanges.length) {
          for (let change of this.queuedStateChanges) {
            this.setState(change);
          }
        }
      }

      componentWillUnmount() {
        this.destroyed$.next();
        this.destroyed$.unsubscribe();
      }
  
      render() {
        return (
          // @ts-ignore Typescript doesn't recognize that this is passed through the function params
          <Source {...this.state} />
        );
      }
    }
  }
}