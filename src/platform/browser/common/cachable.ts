import * as Rx from 'rxjs/rx';

export enum StorageType {
  memory,
  sessionStorage,
  localStorage
}

export interface IStorage {
  get(key: string): Object;
  put(key: string, value: Object);
  remove(key: string);
  removeAll();
}

class WebStorage implements IStorage {
  private static STORAGE_KEY: string = 'rebirth-cachable';
  constructor(private webStorage: Storage) {
  }
  get(key: string): Object {
    let storage = this.webStorage.getItem(WebStorage.STORAGE_KEY) || {};
    return storage[key];
  }

  put(key: string, value: Object) {
    let storage = this.webStorage.getItem(WebStorage.STORAGE_KEY) || {};
    storage[key] = value;
    this.webStorage.setItem(WebStorage.STORAGE_KEY, storage);
  }
  remove(key: string) {
    let storage = this.webStorage.getItem(WebStorage.STORAGE_KEY) || {};
    delete storage[key];
    this.webStorage.setItem(WebStorage.STORAGE_KEY, storage);
  }
  removeAll() {
    this.webStorage.removeItem(WebStorage.STORAGE_KEY)
  }
}

class MemoryStorage implements IStorage {
  private storage: WeakMap<string, Object>;
  constructor() {
    this.storage = new WeakMap<string, Object>();
  }
  get(key: string): Object {
    return this.storage.has(key) ? this.storage.get(key) : null;
  }

  put(key: string, value: Object) {
    this.storage.set(key, value);
  }
  remove(key: string) {
    this.storage.delete(key);
  }
  removeAll() {
    this.storage = new WeakMap<string, Object>();
  }
}

export class StorageFactory {
  storages: WeakMap<StorageType, IStorage>;
  private static factory: StorageFactory = new StorageFactory();
  constructor() {
    this.storages.set(StorageType.memory, new MemoryStorage())
      .set(StorageType.sessionStorage, new WebStorage(window.sessionStorage))
      .set(StorageType.localStorage, new WebStorage(window.localStorage));
  }

  static getInstance(): StorageFactory {
    return StorageFactory.factory;
  }

  getStorage(storageType: StorageType): IStorage {
    return this.storages.get(storageType);
  }

}

export interface IDataCacheStrategy {
  name(): string;
  match(data: any): boolean;
  put(data: any, putStorage: (result: Object) => void);
  get(data: any): Object;
}

export class RxDataCacheStrategy implements IDataCacheStrategy {
  name() {
    return 'RxDataCacheStrategy';
  }

  match(result: any): boolean {
    return result.subscribe;
  }

  put(result: any, putStorage: (data: Object) => void) {
    result.subscribe && result.subscribe(data => putStorage(data));
  }

  get(result: any): Object {
    return Rx.Observable.of(result);
  }
}

export class PromiseDataCacheStrategy implements IDataCacheStrategy {
  name() {
    return 'PromiseDataCacheStrategy';
  }

  match(result: any): boolean {
    return result.then;
  }

  put(result: any, putStorage: (data: Object) => void) {
    result.then && result.then(data => putStorage(data));
  }

  get(result: any): Object {
    return Promise.resolve(result);
  }
}

export class DataCacheStrategyFactory {
  dataCacheStrategies: IDataCacheStrategy[];
  private static factory: DataCacheStrategyFactory = new DataCacheStrategyFactory();
  constructor() {
    this.dataCacheStrategies = [new RxDataCacheStrategy(), new PromiseDataCacheStrategy()];
  }

  static getInstance(): DataCacheStrategyFactory {
    return DataCacheStrategyFactory.factory;
  }

  put(key: string, data: any, storage: IStorage) {
    let strategy = this.dataCacheStrategies.find(t => t.match(data));
    if (strategy) {
      return strategy.put(data, (result) => storage.put(key, { type: strategy.name(), result }));
    }
    storage.put(key, data);
  }
  get(data: any): Object {
    if (data.type) {
      var strategy = this.dataCacheStrategies.find(t => t.name() === data.type);
      if (strategy) {
        return strategy.get(data.result);
      }
    }
    return data;
  }
}

export function Cachable(storageType: StorageType = StorageType.memory) {
  const storage = StorageFactory.getInstance().getStorage(storageType);
  const strategyFactory = DataCacheStrategyFactory.getInstance();
  let getKey = (method: string, args: Object[]) => {
    // TODO: we can change this code or overrid object toString method;
    return `${method}:${args.join('-')}`;
  };

  return (target: any, name: string, value: any) => {
    let method = target[name];
    target[name] = (...args) => {
      const key = getKey(name, args);
      let data: any = storage.get(key)
      if (data) {
        return strategyFactory.get(data);
      }

      let result = method.apply(target, args);
      strategyFactory.put(key, result, storage);
      return result;
    }
  }
}
