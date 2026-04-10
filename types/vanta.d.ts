declare module 'vanta/dist/vanta.clouds.min.js' {
  import type { Three } from 'three'
  function CLOUDS(options: {
    el: HTMLElement | string
    THREE: Three
    mouseControls?: boolean
    touchControls?: boolean
    gyroControls?: boolean
    minHeight?: number
    minWidth?: number
    speed?: number
    backgroundColor?: number
    skyColor?: number
    cloudColor?: number
    cloudShadowColor?: number
    sunColor?: number
    sunlightColor?: number
  }): { destroy: () => void }
  export default CLOUDS
}
