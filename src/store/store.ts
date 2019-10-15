import { BehaviorSubject, Subject } from "rxjs";
import { map, takeUntil } from 'rxjs/operators';

export interface ReactStore {
  get(...propNames: string[]): { [key: string]: any };
}

class Store {
  private _props = new BehaviorSubject<{ [key: string]: BehaviorSubject<any> }>({});
  private reset$ = new Subject<void>();

  get(...propNames: string[]): { [key: string]: any } {
    return this._props.pipe(
      // TODO filter the props BehaviorSubject with the propNames variable
      map(p => {
        const payload: any = {};
        Object.keys(p).filter((k: string) => propNames.includes(k)).map((k: string) => {
          payload[k] = p[k];
        });

        return payload;
      })
    );
  }

  set(prop: string, val: any) {
    if (!this._props.getValue()[prop]) {
      const map = this._props.getValue();
      map[prop] = new BehaviorSubject(val).pipe(takeUntil(this.reset$)) as BehaviorSubject<any>;
      this.reset$.next();
      this._props.next(map);
    } else {
      this._props.getValue()[prop]!.next(val);
    }
  }
}

export default Store;