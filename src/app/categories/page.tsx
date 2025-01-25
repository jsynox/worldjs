"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Itim } from "next/font/google";
import "./switch.css";

const itim = Itim({ weight: "400", subsets: ["latin"] });

const categories = [
  {
    name: "Capital Cities",
    icon: "/images/capital-cities-icon.png", // Updated image path
    href: "/categories/capital-cities",
  },
  {
    name: "Flags",
    icon: "/images/america.png", // Updated image path
    href: "/categories/flags",
  },
];

export default function CategoriesPage() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode is default

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    setIsDarkMode(savedTheme === "dark" || savedTheme === null); // Default dark
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }, [isDarkMode, mounted]);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        isDarkMode ? "from-teal-900 to-gray-900" : "from-teal-100 to-gray-200"
      } flex items-center justify-center p-4 ${itim.className} relative overflow-hidden transition-colors duration-300`}
    >
      {/* Light/Dark Mode Toggle */}
      <div className="absolute top-4 right-4 flex items-center">
        <label className="mr-2 text-sm font-medium text-gray-600 dark:text-gray-300">
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </label>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
          className="toggle-switch data-[state=checked]:bg-teal-600"
        />
      </div>

      <Card
        className={`w-full max-w-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-xl border-gray-700 transition-colors duration-300`}
      >
        <CardContent className="p-6">
          <motion.h1
            className={`text-4xl font-extrabold text-center mb-8 ${
              isDarkMode ? "text-teal-300" : "text-teal-700"
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose a Category
          </motion.h1>
          <div className="grid grid-cols-1 gap-6">
            {categories.map((category, index) => (
              <Link key={category.name} href={category.href}>
                <motion.div
                  className={`${
                    isDarkMode ? "bg-teal-800" : "bg-teal-100"
                  } bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 rounded-lg p-6 text-center cursor-pointer`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.img
                    src={category.icon}
                    alt={category.name}
                    className="mx-auto mb-4 w-16 h-16 object-contain"
                    whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  />
                  <h2
                    className={`text-xl font-semibold ${
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {category.name}
                  </h2>
                </motion.div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
