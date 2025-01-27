"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import dynamic from "next/dynamic";


const SpinningGlobe = dynamic(() => import("@/components/ui/spinning-globe"), { ssr: false });
const ParticleBackground = dynamic(() => import("@/components/ui/particle-background"), { ssr: false });
const MapOverlay = dynamic(() => import("@/components/ui/map-overlay"), { ssr: false });

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isNight, setIsNight] = useState(false);
  const backgroundAnimation = useAnimation();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setIsNight((prev) => !prev);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    backgroundAnimation.start({
      backgroundColor: isNight ? "rgba(0, 0, 50, 0.5)" : "rgba(135, 206, 235, 0.2)",
      transition: { duration: 5 },
    });
  }, [isNight, backgroundAnimation]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <motion.div className="absolute inset-0 z-0" animate={backgroundAnimation}>
        {isClient && (
          <Suspense fallback={<div>Loading background...</div>}>
            <ParticleBackground />
            <MapOverlay />
          </Suspense>
        )}
      </motion.div>

      <div className="rain absolute inset-0 pointer-events-none">
        <div className="rain-wrapper">
          {/* Rain animation via CSS */}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {/* Top right buttons */}
        <div className="fixed top-4 right-4 flex space-x-4 z-10 p-4">
          <Button
            variant="ghost"
            className="text-black font-bold hover:bg-black hover:bg-opacity-20 transition duration-300 rounded-full px-4 text-sm"
            aria-label="Login"
          >
            Login
          </Button>
          <Select value={language} onValueChange={(value) => setLanguage(value)}>
            <SelectTrigger className="w-[100px] text-black font-bold bg-transparent hover:bg-black hover:bg-opacity-20 rounded-full border-none text-sm">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            className="text-black font-bold hover:bg-black hover:bg-opacity-20 transition duration-300 rounded-full px-4 text-sm"
            aria-label="Info"
          >
            Info
          </Button>
        </div>

        {/* Main title */}
        <h1
  className="text-7xl md:text-9xl font-bold text-center mb-12 leading-tight"
  style={{
    background: "linear-gradient(45deg, #6a1b9a, #1e88e5)", // Purple to Blue gradient
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)", // Soft shadow for a cool effect
    fontFamily: "'Cinzel', serif", // Adding Cinzel font for the title
  }}
>
  GuessOrKnow
</h1>

        {/* Globe Section */}
        <Link href="/categories" aria-label="Explore Categories">
          <motion.div
            className="relative w-64 h-64 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Suspense fallback={<div>Loading globe...</div>}>
              <SpinningGlobe />
            </Suspense>

            {/* Play Now Text */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Play Now
              </motion.div>
            )}
          </motion.div>
        </Link>

        {/* Description Text */}
        <p
          className="mt-8 text-xl font-bold text-center max-w-lg mx-auto"
          style={{ color: "#4A4A4A" }} // Klareres Weiß für den Text
        >
          {language === "en"
            ? "Test your knowledge of world geography!"
            : "Testen Sie Ihr Wissen über Weltgeographie!"}
        </p>

         {/* Signature */}
         <p
          className="mt-4 text-sm text-center font-bold"
          style={{ fontFamily: "'Itim', cursive", color: "#1e88e5" }} // Cool unique font for signature
        >
          by jS
        </p>
      </div>
    </div>
  );
}
