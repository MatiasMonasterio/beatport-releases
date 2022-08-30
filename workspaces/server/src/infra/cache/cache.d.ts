export interface Cache {
  set: (key: string, value: T, expiryTime?: number) => Promise<void>;
  getOne: (key: string) => Promise<T | null>;
  deleteOne: (key: string) => Promise<void>;
  exist: (key: string) => Promise<boolean>;
  connect: () => Promise<void>;
}
