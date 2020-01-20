import Store, { ReactStore } from '../store/store';


export default class App_Store implements ReactStore {
  private static instance: App_Store;
  private store = new Store();

  private constructor() { }

  static getInstance() {
    if (!this.instance) {
      this.instance = new App_Store();
    }

    return this.instance;
  }

  get(...propNames: string[]) {
    return this.store.get(...propNames)
  }
  
  set someValue(val: any) {
    this.store.set('someValue', val);
  }

}