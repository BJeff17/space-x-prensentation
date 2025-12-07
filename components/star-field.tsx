"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Star {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  brightness: number
}

interface ShootingStar {
  id: number
  startX: number
  startY: number
  angle: number
  delay: number
}

export default function StarField() {
  const [stars, setStars] = useState<Star[]>([])
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])

  useEffect(() => {
    // Generate regular stars
    const newStars: Star[] = []
    for (let i = 0; i < 200; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        brightness: Math.random() * 0.5 + 0.5,
      })
    }
    setStars(newStars)

    // Generate shooting stars
    const newShootingStars: ShootingStar[] = []
    for (let i = 0; i < 5; i++) {
      newShootingStars.push({
        id: i,
        startX: Math.random() * 80 + 10,
        startY: Math.random() * 30,
        angle: Math.random() * 30 + 15,
        delay: Math.random() * 15 + i * 8,
      })
    }
    setShootingStars(newShootingStars)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Regular stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: `rgba(255, 255, 255, ${star.brightness})`,
            boxShadow: star.size > 1.5 ? `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)` : "none",
          }}
          animate={{
            opacity: [star.brightness * 0.3, star.brightness, star.brightness * 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            width: "100px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, white, transparent)",
            transform: `rotate(${star.angle}deg)`,
          }}
          initial={{ x: 0, y: 0, opacity: 0, scaleX: 0 }}
          animate={{
            x: [0, 300],
            y: [0, 200],
            opacity: [0, 1, 1, 0],
            scaleX: [0, 1, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: star.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Nebula effects */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          top: "20%",
          right: "10%",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          bottom: "30%",
          left: "5%",
          filter: "blur(50px)",
        }}
      />
    </div>
  )
}
