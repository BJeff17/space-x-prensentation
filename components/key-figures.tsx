"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const figures = [
  { value: 300, suffix: "+", label: "Successful Launches", icon: "🚀" },
  { value: 6000, suffix: "+", label: "Starlink Satellites", icon: "📡" },
  { value: 13000, suffix: "+", label: "Employees", icon: "👥" },
  { value: 60, suffix: "+", label: "Countries Served", icon: "🌍" },
  { value: 210, suffix: "B", label: "Valuation ($)", icon: "💰" },
  { value: 22, suffix: "", label: "Years of Innovation", icon: "⚡" },
]

function AnimatedNumber({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isVisible, value])

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Detailed rocket component for figures
function FigureRocket({ delay, onLanded }: { delay: number; onLanded: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onLanded, delay * 1000 + 1200)
    return () => clearTimeout(timer)
  }, [delay, onLanded])

  return (
    <motion.div
      className="absolute -top-20 left-1/2 -translate-x-1/2 z-20"
      initial={{ y: -150, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <svg width="50" height="90" viewBox="0 0 50 90" fill="none">
        <path
          d="M25 0C25 0 8 18 8 42C8 58 16 68 16 68H34C34 68 42 58 42 42C42 18 25 0 25 0Z"
          fill="url(#figRocketBody)"
        />
        <circle cx="25" cy="30" r="8" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" />
        <circle cx="25" cy="30" r="4" fill="#38bdf8" opacity="0.7" />
        <path d="M8 42L-2 62L8 56V42Z" fill="#dc2626" />
        <path d="M42 42L52 62L42 56V42Z" fill="#dc2626" />
        <rect x="20" y="65" width="10" height="12" fill="#4b5563" />
        <motion.g
          animate={{ scaleY: [1, 1.5, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 0.12, repeat: Number.POSITIVE_INFINITY }}
        >
          <ellipse cx="25" cy="85" rx="8" ry="10" fill="#f97316" />
          <ellipse cx="25" cy="82" rx="5" ry="6" fill="#fbbf24" />
          <ellipse cx="25" cy="80" rx="3" ry="4" fill="#fef3c7" />
        </motion.g>
        <defs>
          <linearGradient id="figRocketBody" x1="25" y1="0" x2="25" y2="68" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

// Smoke effect component
function SmokeEffect({ isActive }: { isActive: boolean }) {
  if (!isActive) return null

  return (
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-muted-foreground/40"
          initial={{ y: 0, x: 0, scale: 0.3, opacity: 0.9 }}
          animate={{
            y: [0, 40, 80],
            x: [
              (i % 2 === 0 ? 1 : -1) * (5 + i * 6),
              (i % 2 === 0 ? 1 : -1) * (15 + i * 8),
              (i % 2 === 0 ? 1 : -1) * (25 + i * 10),
            ],
            scale: [0.3, 1, 1.8],
            opacity: [0.9, 0.5, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.15,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

function FigureCard({ figure, index }: { figure: (typeof figures)[0]; index: number }) {
  const [hasLanded, setHasLanded] = useState(false)
  const [showSmoke, setShowSmoke] = useState(false)

  const handleLanded = () => {
    setShowSmoke(true)
    setTimeout(() => {
      setHasLanded(true)
      setTimeout(() => setShowSmoke(false), 600)
    }, 200)
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Rocket animation */}
      {!hasLanded && <FigureRocket delay={0.3 + index * 0.25} onLanded={handleLanded} />}

      {/* Small landed rocket */}
      {hasLanded && (
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ scale: 1 }}
          animate={{ scale: 0.5, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="30" height="45" viewBox="0 0 50 90" fill="none">
            <path d="M25 0C25 0 8 18 8 42C8 58 16 68 16 68H34C34 68 42 58 42 42C42 18 25 0 25 0Z" fill="#e2e8f0" />
            <circle cx="25" cy="30" r="8" fill="#0f172a" />
            <path d="M8 42L-2 62L8 56V42Z" fill="#dc2626" />
            <path d="M42 42L52 62L42 56V42Z" fill="#dc2626" />
          </svg>
        </motion.div>
      )}

      {/* Smoke effect */}
      <SmokeEffect isActive={showSmoke} />

      {/* Card content */}
      <motion.div
        className="bg-card/90 border-2 border-border rounded-2xl p-8 text-center backdrop-blur-sm relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={hasLanded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ borderColor: "rgba(100, 200, 255, 0.6)", scale: 1.02 }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <motion.p
          className="text-4xl md:text-5xl font-bold mb-3 text-primary relative z-10"
          initial={{ opacity: 0 }}
          animate={hasLanded ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <AnimatedNumber value={figure.value} suffix={figure.suffix} isVisible={hasLanded} />
        </motion.p>

        <motion.p
          className="text-sm md:text-base text-muted-foreground relative z-10"
          initial={{ opacity: 0 }}
          animate={hasLanded ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {figure.label}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default function KeyFigures() {
  return (
    <section className="relative h-full flex flex-col items-center justify-center px-4 py-12">
      {/* Background rockets flying */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${10 + i * 15}%`, top: "100%" }}
            animate={{ y: "-200vh" }}
            transition={{ duration: 12 + i * 2, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: i * 2 }}
          >
            <svg width="24" height="40" viewBox="0 0 40 72" fill="none" opacity="0.1">
              <path d="M20 0C20 0 5 15 5 35C5 48 12 55 12 55H28C28 55 35 48 35 35C35 15 20 0 20 0Z" fill="#60a5fa" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
            Key <span className="text-primary">Figures</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            The achievements that make SpaceX a leader in the space industry
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {figures.map((figure, index) => (
            <FigureCard key={figure.label} figure={figure} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
