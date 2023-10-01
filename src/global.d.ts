export interface Config {
  version: string
  name: string
  theme: string
  [key: string]: any
}

declare global {
  interface Window {
    CONFIG: Config
  }
}

// declare const window: any;
