import { BehaviorSubject, Subject, Observable } from "rxjs";
import { AnonymousSubject } from "rxjs/internal/Subject";
import { map, takeUntil } from 'rxjs/operators';

export interface ReactStore {
  get(...propNames: string[]): { [key: string]: any };
}

class Store {
  private props: { [key: string]: any } = {};
  private props$ = new BehaviorSubject<{ [key: string]: AnonymousSubject<any> }>({});
  private reset$ = new Subject<void>();

  get(...propNames: string[]): Observable<{ [key: string]: any }> {
    return this.props$.pipe(
      map(p => {
        const payload: any = {};

        Object.keys(p).filter((k: string) => propNames ? propNames.includes(k) : true).map((k: string) => {
          payload[k] = p[k];
        });

        return payload;
      })
    );
  }

  snapshot(...propNames: string[]): { [key: string]: any } {
    const payload: any = {};

    Object.keys(this.props).filter((k: string) => propNames && propNames.length ? propNames.includes(k) : true).map((k: string) => {
      payload[k] = this.props[k]
    });

    return payload;
  }

  set(prop: string, val: any) {

    this.snapshot();

    if (!this.props$.getValue()[prop]) {
      const map = this.props$.getValue();
      map[prop] = new BehaviorSubject(val).pipe(takeUntil(this.reset$)) as AnonymousSubject<any>;
      this.reset$.next();
      this.props$.next(map);

      // update static store
      this.props[prop] = val;
    } else {
      this.props$.getValue()[prop]!.next(val);
    }
  }
}

export default Store;