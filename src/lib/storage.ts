import type { Readable, Subscriber } from "svelte/store";

export type Types = typeof values;

const values = {
  count: 0,
};

const subscribers: { [key in keyof Types]: Set<Subscriber<Types[key]>> } = {
  count: new Set(),
};

function update<K extends keyof Types>(key: K, value: Types[K]) {
  if (values[key] === value) {
    return;
  }
  values[key] = value;
  for (const subscriber of subscribers[key]) {
    subscriber(value);
  }
}

chrome.storage.local.get(Object.keys(values)).then((values) => {
  for (const [key, value] of Object.entries(values)) {
    update(key as keyof Types, value);
  }
});

chrome.storage.local.onChanged.addListener((changes) => {
  for (const [key, { newValue }] of Object.entries(changes)) {
    if (key in values) {
      update(key as keyof Types, newValue);
    }
  }
});

/** Writable interface for both updating and subscribing. */
export interface AsyncWritable<T> extends Readable<T> {
  /**
   * Set value and inform subscribers.
   * @param value to set
   */
  set(this: void, value: T): Promise<void>;
}

export function local<K extends keyof Types>(key: K): AsyncWritable<Types[K]> {
  return {
    subscribe(subscriber) {
      subscriber(values[key]);
      subscribers[key].add(subscriber);
      return () => void subscribers[key].delete(subscriber);
    },

    set(value) {
      update(key, value);
      return chrome.storage.local.set({ [key]: value });
    },
  };
}
