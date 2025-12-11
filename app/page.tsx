"use client"

import { useState, useEffect, useCallback } from "react"
import HeroSection from "@/components/hero-section"
import KeyFigures from "@/components/key-figures"
import SolarOrgChart from "@/components/solar-org-chart"
import Credits from "@/components/credits"
import StarField from "@/components/star-field"
import { ChevronUp, ChevronDown, Maximize2, Minimize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
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

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (! document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch((err) => {
        console. error(`Erreur fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      })
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        goToSection("down")
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        goToSection("up")
      } else if (e.key === "Escape" && isFullscreen) {
        // Escape is handled automatically by the browser to exit fullscreen
        // but we update our state
        setIsFullscreen(false)
      } else if (e.key === "f" || e.key === "F") {
        // F key to toggle fullscreen
        toggleFullscreen()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToSection, isFullscreen, toggleFullscreen])

  // Listen for fullscreen changes (when user presses Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Mouse wheel navigation with orgchart scroll detection
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Check if we're on the orgchart section (index 2)
      if (currentSection === 2) {
        const orgChartContainer = document.getElementById('org-chart-container')
        
        if (orgChartContainer) {
          const { scrollTop, scrollHeight, clientHeight } = orgChartContainer
          const isAtTop = scrollTop === 0
          const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1
          
          // Only navigate to other slides if at the edges of the scroll
          if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
            e.preventDefault()
            if (e.deltaY > 0) {
              goToSection("down")
            } else {
              goToSection("up")
            }
          }
          // Otherwise, let the orgchart scroll naturally
          return
        }
      }
      
      // For other sections, normal slide navigation
      e.preventDefault()
      if (e.deltaY > 0) {
        goToSection("down")
      } else {
        goToSection("up")
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [goToSection, currentSection])

  return (
    <main className="relative h-screen w-screen bg-background overflow-hidden">
      <StarField />

      {/* Bouton Fullscreen - transparent par défaut, visible au hover */}
      <motion.button
        onClick={toggleFullscreen}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card/20 border border-border/30 backdrop-blur-sm 
                   opacity-30 hover:opacity-100 hover:bg-card/80 hover:border-border 
                   transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isFullscreen ? "Quitter le plein écran (Esc)" : "Plein écran (F)"}
      >
        {isFullscreen ? (
          <Minimize2 className="w-5 h-5 text-foreground/50 group-hover:text-foreground transition-colors" />
        ) : (
          <Maximize2 className="w-5 h-5 text-foreground/50 group-hover:text-foreground transition-colors" />
        )}
      </motion.button>

      {/* Navigation arrows - également plus discrets */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        <motion.button
          onClick={() => goToSection("up")}
          disabled={currentSection === 0}
          className="p-3 rounded-full bg-card/20 border border-border/30 backdrop-blur-sm 
                     disabled:opacity-10 disabled:cursor-not-allowed 
                     opacity-30 hover:opacity-100 hover:bg-card/80 hover:border-border 
                     transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp className="w-6 h-6 text-foreground/50 group-hover:text-foreground transition-colors" />
        </motion.button>
        <motion.button
          onClick={() => goToSection("down")}
          disabled={currentSection === sections.length - 1}
          className="p-3 rounded-full bg-card/20 border border-border/30 backdrop-blur-sm 
                     disabled:opacity-10 disabled:cursor-not-allowed 
                     opacity-30 hover:opacity-100 hover:bg-card/80 hover:border-border 
                     transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronDown className="w-6 h-6 text-foreground/50 group-hover:text-foreground transition-colors" />
        </motion.button>
      </div>

      {/* Section indicators - également plus discrets */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 
                      opacity-40 hover:opacity-100 transition-opacity duration-300">
        {sections.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => {
              if (! isTransitioning) {
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
            animate={{ opacity: 1, y:  0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full w-full"
          >
            <HeroSection />
          </motion.div>
        )}
        {currentSection === 1 && (
          <motion.div
            key="figures"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y:  0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full w-full"
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
            className="h-full w-full overflow-y-auto"
          >
            <SolarOrgChart />
          </motion.div>
        )}
        {currentSection === 3 && (
          <motion.div
            key="credits"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y:  0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="h-full w-full"
          >
            <Credits />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
