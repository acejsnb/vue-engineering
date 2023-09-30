interface Config {
  version: string
  name: string
  theme: string
}

declare global {
  interface Window {
    CONFIG?: Config
  }
}
