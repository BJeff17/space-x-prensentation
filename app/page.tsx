"use client"

import { useState, useEffect, useCallback } from "react"
import HeroSection from "@/components/hero-section"
import KeyFigures from "@/components/key-figures"
import SolarOrgChart from "@/components/solar-org-chart"
import Credits from "@/components/credits"
import StarField from "@/components/star-field"
import { ChevronUp, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sections = ["hero", "figures", "orgchart", "credits"]

  const goToSection = useCallback(
    (direction: "up" | "down") => {
      if (isTransitioning) return

      setIsTransitioning(true)
      setCurrentSection((prev) => {
        if (direction === "down" && prev < sections.length - 1) return prev + 1
        if (direction === "up" && prev > 0) return prev - 1
        return prev
      })

      setTimeout(() => setIsTransitioning(false), 800)
    },
    [isTransitioning, sections.length],
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        goToSection("down")
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        goToSection("up")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToSection])

  // Mouse wheel navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0) {
        goToSection("down")
      } else {
        goToSection("up")
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [goToSection])

  return (
    <main className="relative h-screen bg-background overflow-hidden">
      <StarField />

      {/* Navigation arrows */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        <motion.button
          onClick={() => goToSection("up")}
          disabled={currentSection === 0}
          className="p-3 rounded-full bg-card/80 border border-border backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/20 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp className="w-6 h-6 text-foreground" />
        </motion.button>
        <motion.button
          onClick={() => goToSection("down")}
          disabled={currentSection === sections.length - 1}
          className="p-3 rounded-full bg-card/80 border border-border backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/20 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDown className="w-6 h-6 text-foreground" />
        </motion.button>
      </div>

      {/* Section indicators */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {sections.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true)
                setCurrentSection(idx)
                setTimeout(() => setIsTransitioning(false), 800)
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === idx ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>

      {/* Sections with slide transitions */}
      <AnimatePresence mode="wait">
        {currentSection === 0 && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full"
          >
            <HeroSection />
          </motion.div>
        )}
        {currentSection === 1 && (
          <motion.div
            key="figures"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full"
          >
            <KeyFigures />
          </motion.div>
        )}
        {currentSection === 2 && (
          <motion.div
            key="orgchart"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full overflow-y-auto"
          >
            <SolarOrgChart />
          </motion.div>
        )}
        {currentSection === 3 && (
          <motion.div
            key="credits"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full"
          >
            <Credits />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
