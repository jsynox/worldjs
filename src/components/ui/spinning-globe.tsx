"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function SpinningGlobe() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      className="w-full h-full"
    >
      <Image src="/earth-globe.png" alt="Spinning Earth Globe" width={256} height={256} className="rounded-full" />
    </motion.div>
  )
}

