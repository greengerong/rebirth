import { Observable }     from 'rxjs/Observable';

export enum StorageType {
  memory,
  sessionStorage,
  localStorage
}

export interface IStorage {
  get(pool: string, key: string): Object;
  put(pool: string, key: string, value: Object);
  remove(pool: string);
  removeAll();
}

class WebStorage implements IStorage {
  constructor(private webStorage: Storage) {
  }

  getAll(pool: string) {
    let json = this.webStorage.getItem(pool);
    return json ? JSON.parse(json) : {};
  }

  saveAll(pool: string, storage) {
    this.webStorage.setItem(pool, JSON.stringify(storage));
  }

  get(pool: string, key: string): Object {
    let storage = this.getAll(pool);
    return storage[key];
  }

  put(pool: string, key: string, value: Object) {
    let storage = this.getAll(pool);
    storage[key] = value;
    this.saveAll(pool, storage);
  }

  remove(pool: string) {
    this.webStorage.removeItem(pool);
  }

  removeAll() {
    this.webStorage.clear();
  }
}

class MemoryStorage implements IStorage {
  private storage: Map<string, Map<string, Object>>;

  constructor() {
    this.storage = new Map<string, Map<string, Object>>();
  }

  getAll(pool: string): Map<string, Object> {
    return this.storage.has(pool) ? this.storage.get(pool) : new Map<string, Object>();
  }

  get(pool: string, key: string): Object {
    let storage = this.getAll(pool);
    return storage.has(key) ? storage.get(key) : null;
  }

  put(pool: string, key: string, value: Object) {
    if (!this.storage.has(pool)) {
      this.storage.set(pool, new Map<string, Object>());
    }
    this.storage.get(pool).set(key, value);
  }

  remove(pool: string) {
    this.storage.delete(pool);
  }

  removeAll() {
    this.storage = new Map<string, Map<string, Object>>();
  }
}

export class StorageFactory {
  private static factory: StorageFactory = new StorageFactory();
  storages: Map<Object, IStorage>;

  static getInstance(): StorageFactory {
    return StorageFactory.factory;
  }

  constructor() {
    this.storages = new Map<String, IStorage>();
    this.storages.set(StorageType.memory, new MemoryStorage())
      .set(StorageType.sessionStorage, new WebStorage(window.sessionStorage))
      .set(StorageType.localStorage, new WebStorage(window.localStorage));
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
    return result.map(data => {
      setTimeout(() => putStorage(data));
      return data;
    });
  }

  get(result: any): Object {
    return Observable.fromPromise(Promise.resolve(result));
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
    return result.then(data => setTimeout(() => putStorage(data)));
  }

  get(result: any): Object {
    return Promise.resolve(result);
  }
}

export class DataCacheStrategyFactory {
  private static factory: DataCacheStrategyFactory = new DataCacheStrategyFactory();
  dataCacheStrategies: IDataCacheStrategy[];

  static getInstance(): DataCacheStrategyFactory {
    return DataCacheStrategyFactory.factory;
  }

  constructor() {
    this.dataCacheStrategies = [new RxDataCacheStrategy(), new PromiseDataCacheStrategy()];
  }

  put(pool: string, key: string, data: any, storage: IStorage) {
    let strategy = this.dataCacheStrategies.find(t => t.match(data));
    if (strategy) {
      return strategy.put(data, (result) => storage.put(pool, key, { type: strategy.name(), result }));
    }
    setTimeout(() => storage.put(pool, key, data));
    return data;
  }

  get(data: any): Object {
    if (data.type) {
      let strategy = this.dataCacheStrategies.find(t => t.name() === data.type);
      if (strategy) {
        return strategy.get(data.result);
      }
    }
    return data;
  }
}

export function Cacheable(config: { pool?: string, key?: string, storageType?: StorageType } = {}) {
  const pool = config.pool || 'rebirth-cachable:default';
  const storageType = config.storageType || StorageType.memory;
  const storage = StorageFactory.getInstance().getStorage(storageType);
  const strategyFactory = DataCacheStrategyFactory.getInstance();
  let getKey = (target: any, method: string, args: Object[]) => {
    // TODO: we can change this code or overrid object toString method;
    let prefix = config.key || `${target.constructor.name}.${method}`;
    return `${prefix}:${args.join('-')}`;
  };

  return function (target: any, name: string, methodInfo: any) {
    let method = methodInfo.value;

    let proxy = function (...args) {
      const key = getKey(target, name, args);
      let data: any = storage.get(pool, key);
      if (data) {
        return strategyFactory.get(data);
      }

      let result = method.apply(this, args);
      return strategyFactory.put(pool, key, result, storage);
    };

    (<any>proxy).cacheEvict = function () {
      storage.remove(pool);
    };

    return {
      value: proxy
    };
  };
}
