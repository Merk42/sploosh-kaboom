export interface Config {
  shake: boolean
  vibrate: boolean
  animate: boolean
  sound: boolean
  theme: '' | 'light' | 'dark' | 'system'
}
export interface Target {
  [key: string]: number
}
export interface Display {
  [key: string]: string
}
