"use client"

import { useEffect, useRef } from "react"
import Globe from "globe.gl"

const GlobeConfig = () => {
  const globeEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let globe: any
    if (globeEl.current) {
      // Correct instantiation of Globe
      globe = Globe()(globeEl.current)  // <-- Fix this line
      
      globe
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
        .backgroundColor("rgba(0,0,0,0)")
        .width(176)
        .height(176)
    }
    
    return () => {
      if (globe) {
        globe._destructor()
      }
    }
  }, [])

  return <div ref={globeEl} />
}

export default GlobeConfig
