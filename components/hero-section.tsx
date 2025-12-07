"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 3000),
      setTimeout(() => setPhase(2), 5500),
      setTimeout(() => setPhase(3), 9000),
      setTimeout(() => setPhase(4), 11500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section className="relative h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-slate-900/20">
      {/* Subtle star background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.4,
            }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Moon Landing Scene - Left Side */}
      <div className="absolute left-8 md:left-16 bottom-4 w-64 md:w-80 pointer-events-none">
        <div className="absolute bottom-0 w-full h-32">
          {/* Base lunar surface with realistic gradient */}
          <div
            className="absolute bottom-0 w-full h-28 rounded-t-[60%]"
            style={{
              background: "linear-gradient(180deg, #b8bcc4 0%, #8a8f99 30%, #6b7280 60%, #4b5563 100%)",
              boxShadow: "inset 0 10px 30px rgba(0,0,0,0.3), 0 0 60px rgba(200,200,200,0.1)",
            }}
          />
          {/* Surface texture layer */}
          <div
            className="absolute bottom-0 w-full h-28 rounded-t-[60%] opacity-50"
            style={{
              background:
                "radial-gradient(ellipse 120% 80% at 30% 80%, #9ca3af 0%, transparent 50%), radial-gradient(ellipse 100% 60% at 70% 70%, #6b7280 0%, transparent 40%)",
            }}
          />
          {/* Realistic craters */}
          {[
            { x: "12%", y: "45%", size: 22, depth: 0.4 },
            { x: "35%", y: "55%", size: 16, depth: 0.35 },
            { x: "60%", y: "40%", size: 28, depth: 0.5 },
            { x: "80%", y: "50%", size: 14, depth: 0.3 },
            { x: "25%", y: "70%", size: 10, depth: 0.25 },
            { x: "72%", y: "65%", size: 18, depth: 0.45 },
          ].map((crater, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: crater.x,
                top: crater.y,
                width: crater.size,
                height: crater.size * 0.4,
                background: `radial-gradient(ellipse at 50% 30%, rgba(75,85,99,${crater.depth}) 0%, rgba(55,65,81,${crater.depth + 0.2}) 60%, rgba(31,41,55,${crater.depth + 0.3}) 100%)`,
                boxShadow: `inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(255,255,255,0.1)`,
              }}
            />
          ))}
          {/* Small rocks and debris */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-sm"
              style={{
                left: `${10 + i * 11}%`,
                top: `${60 + (i % 3) * 10}%`,
                width: 3 + (i % 4) * 2,
                height: 2 + (i % 3) * 2,
                background: `linear-gradient(135deg, #9ca3af 0%, #4b5563 100%)`,
                transform: `rotate(${i * 25}deg)`,
              }}
            />
          ))}
        </div>

        {/* Lunar Module */}
        <motion.div
          className="absolute bottom-28 left-1/2 -translate-x-1/2"
          initial={{ y: -300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <svg width="70" height="80" viewBox="0 0 70 80" fill="none">
            <rect x="18" y="22" width="34" height="28" rx="4" fill="#e5e7eb" />
            <rect x="18" y="22" width="34" height="28" rx="4" stroke="#9ca3af" strokeWidth="1" />
            <rect x="24" y="28" width="10" height="10" rx="2" fill="#1e3a5f" />
            <rect x="36" y="28" width="10" height="10" rx="2" fill="#1e3a5f" />
            <rect x="24" y="28" width="10" height="10" rx="2" fill="#60a5fa" opacity="0.4" />
            <rect x="36" y="28" width="10" height="10" rx="2" fill="#60a5fa" opacity="0.4" />
            <path d="M12 50L22 42V50H12Z" fill="#9ca3af" />
            <path d="M58 50L48 42V50H58Z" fill="#9ca3af" />
            <rect x="28" y="50" width="14" height="10" fill="#6b7280" />
            <line x1="5" y1="78" x2="22" y2="52" stroke="#9ca3af" strokeWidth="3" />
            <line x1="65" y1="78" x2="48" y2="52" stroke="#9ca3af" strokeWidth="3" />
            <circle cx="5" cy="78" r="4" fill="#6b7280" />
            <circle cx="65" cy="78" r="4" fill="#6b7280" />
            <circle cx="35" cy="78" r="4" fill="#6b7280" />
            <rect x="32" y="6" width="6" height="16" fill="#9ca3af" />
            <rect x="29" y="2" width="12" height="6" fill="#fbbf24" />
          </svg>

          {/* Landing dust */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2.5, 3], opacity: [0, 0.5, 0] }}
            transition={{ duration: 1.5, delay: 2 }}
          >
            <div className="w-32 h-6 bg-gray-400/40 rounded-full blur-lg" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-24 left-12"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Flag pole going INTO the ground */}
          <div className="relative">
            <div className="w-1 h-16 bg-gradient-to-b from-gray-300 to-gray-500" />
            {/* Ground insertion point */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-2 bg-gradient-to-b from-gray-500 to-gray-700 rounded-full" />
            {/* Flag (not animated/floating) */}
            <div className="absolute top-0 left-1 w-10 h-6 overflow-hidden shadow-md">
              {/* Red stripes */}
              <div
                className="w-full h-full"
                style={{
                  background: "repeating-linear-gradient(180deg, #dc2626 0px, #dc2626 4px, #ffffff 4px, #ffffff 8px)",
                }}
              />
              {/* Blue canton */}
              <div className="absolute top-0 left-0 w-4 h-3 bg-blue-900" />
            </div>
          </div>
        </motion.div>

        <motion.span
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
        >
          Moon Landing
        </motion.span>
      </div>

      {/* Mars Landing Scene - Right Side */}
      <motion.div
        className="absolute right-8 md:right-16 bottom-4 w-64 md:w-80 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute bottom-0 w-full h-36">
          {/* Base Mars surface */}
          <div
            className="absolute bottom-0 w-full h-32 rounded-t-[55%]"
            style={{
              background: "linear-gradient(180deg, #e07850 0%, #c45a3a 25%, #a04428 50%, #7c2d12 80%, #5c1f0d 100%)",
              boxShadow: "inset 0 15px 40px rgba(0,0,0,0.4), 0 0 80px rgba(220,100,70,0.15)",
            }}
          />
          {/* Surface dust layer */}
          <div
            className="absolute bottom-0 w-full h-32 rounded-t-[55%] opacity-40"
            style={{
              background: "radial-gradient(ellipse 150% 100% at 40% 90%, #f97316 0%, transparent 60%)",
            }}
          />
          {/* Realistic Martian rocks */}
          {[
            { x: "15%", y: "50%", w: 28, h: 18, rot: -5 },
            { x: "45%", y: "40%", w: 18, h: 12, rot: 10 },
            { x: "70%", y: "55%", w: 35, h: 20, rot: -8 },
            { x: "85%", y: "45%", w: 14, h: 10, rot: 15 },
            { x: "30%", y: "65%", w: 12, h: 8, rot: -12 },
          ].map((rock, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: rock.x,
                top: rock.y,
                width: rock.w,
                height: rock.h,
                background: `linear-gradient(${135 + i * 20}deg, #92400e 0%, #78350f 40%, #451a03 100%)`,
                borderRadius: "30% 60% 40% 70%",
                transform: `rotate(${rock.rot}deg)`,
                boxShadow: "2px 3px 6px rgba(0,0,0,0.4)",
              }}
            />
          ))}
          {/* Small pebbles */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${8 + i * 9}%`,
                top: `${55 + (i % 4) * 10}%`,
                width: 2 + (i % 3) * 2,
                height: 2 + (i % 2) * 2,
                background: `linear-gradient(135deg, #a16207 0%, #78350f 100%)`,
              }}
            />
          ))}
        </div>

        {/* Starship */}
        <motion.div
          className="absolute bottom-28 left-1/2 -translate-x-1/2"
          initial={{ y: -400, opacity: 0 }}
          animate={{ y: phase >= 2 ? 0 : -400, opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 3, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
        >
          <svg width="55" height="110" viewBox="0 0 55 110" fill="none">
            <path d="M27.5 0C27.5 0 8 12 8 45V78H47V45C47 12 27.5 0 27.5 0Z" fill="url(#starship)" />
            <path d="M27.5 0C27.5 0 8 12 8 45V78H47V45C47 12 27.5 0 27.5 0Z" stroke="#9ca3af" strokeWidth="0.5" />
            <rect x="19" y="22" width="17" height="14" rx="3" fill="#0f172a" />
            <rect x="19" y="22" width="17" height="14" rx="3" fill="#38bdf8" opacity="0.3" />
            <path d="M8 78L2 98L12 88H8V78Z" fill="#4b5563" />
            <path d="M47 78L53 98L43 88H47V78Z" fill="#4b5563" />
            <rect x="23" y="78" width="9" height="14" fill="#6b7280" />

            <motion.g
              animate={{ opacity: phase >= 2 && phase < 3 ? [0.8, 1, 0.8] : 0 }}
              transition={{ duration: 0.08, repeat: phase >= 2 && phase < 3 ? Number.POSITIVE_INFINITY : 0 }}
            >
              <ellipse cx="27.5" cy="100" rx="10" ry="14" fill="#f97316" />
              <ellipse cx="27.5" cy="96" rx="6" ry="9" fill="#fbbf24" />
              <ellipse cx="27.5" cy="93" rx="3" ry="5" fill="#fef3c7" />
            </motion.g>

            <defs>
              <linearGradient id="starship" x1="27.5" y1="0" x2="27.5" y2="78" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f8fafc" />
                <stop offset="1" stopColor="#cbd5e1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Mars dust on landing */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: phase >= 3 ? [0, 3] : 0, opacity: phase >= 3 ? [0, 0.6, 0] : 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="w-36 h-8 bg-orange-500/40 rounded-full blur-xl" />
          </motion.div>
        </motion.div>

        <motion.span
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
        >
          Mars Colony
        </motion.span>
      </motion.div>

      {/* Asteroid Collision - Top */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-72 h-48 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 4 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Asteroid */}
        <motion.div
          className="absolute top-16 left-28"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <svg width="60" height="50" viewBox="0 0 60 50" fill="none">
            <path d="M8 25C8 12 20 4 35 4C50 4 56 15 56 28C56 41 45 46 30 46C15 46 8 38 8 25Z" fill="url(#asteroid)" />
            <ellipse cx="20" cy="18" rx="6" ry="4" fill="#374151" />
            <ellipse cx="38" cy="30" rx="8" ry="5" fill="#374151" />
            <ellipse cx="26" cy="36" rx="5" ry="3" fill="#374151" />
            <defs>
              <linearGradient id="asteroid" x1="8" y1="4" x2="56" y2="46" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9ca3af" />
                <stop offset="1" stopColor="#374151" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Impacting spacecraft */}
        <motion.div
          className="absolute"
          initial={{ top: -20, right: 20, rotate: -45 }}
          animate={phase >= 4 ? { top: 50, right: 90, rotate: -45 } : {}}
          transition={{ duration: 2, ease: "easeIn" }}
        >
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
            <path d="M12 0L4 12V28H20V12L12 0Z" fill="#e5e7eb" />
            <circle cx="12" cy="16" r="3" fill="#3b82f6" />
            <motion.ellipse
              cx="12"
              cy="36"
              rx="4"
              ry="6"
              fill="#f97316"
              animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 0.1, repeat: Number.POSITIVE_INFINITY }}
            />
          </svg>
        </motion.div>

        {/* Explosion */}
        <motion.div
          className="absolute top-14 left-24"
          initial={{ scale: 0, opacity: 0 }}
          animate={phase >= 4 ? { scale: [0, 2.5, 3], opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1, delay: 1.8, repeat: Number.POSITIVE_INFINITY, repeatDelay: 6 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 via-yellow-400 to-red-600 blur-xl" />
        </motion.div>

        {/* Debris */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-20 left-32 rounded-full"
            style={{
              width: 3 + Math.random() * 6,
              height: 3 + Math.random() * 6,
              background: `hsl(${25 + Math.random() * 25}, 85%, ${55 + Math.random() * 25}%)`,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={
              phase >= 4
                ? {
                    x: (Math.random() - 0.5) * 250,
                    y: (Math.random() - 0.5) * 180,
                    opacity: [0, 1, 0],
                    rotate: Math.random() * 720,
                  }
                : {}
            }
            transition={{
              duration: 1.5 + Math.random() * 0.5,
              delay: 1.9 + Math.random() * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 6,
            }}
          />
        ))}

        <motion.span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          Asteroid Defense
        </motion.span>
      </motion.div>

      {/* Main Content - Centered */}
      <div className="relative z-10 text-center max-w-4xl px-8">
        {/* Logo - Always visible */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <motion.div
            className="absolute inset-0 blur-3xl bg-primary/10 -z-10"
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.25em] text-foreground">
            SPACE<span className="text-primary">X</span>
          </h1>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto mb-6 leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          Revolutionizing the space industry to make life multiplanetary
        </motion.p>

        <motion.p
          className="text-base text-foreground/80 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          Founded in 2002 by Elon Musk, SpaceX designs, manufactures, and launches advanced rockets and spacecraft. The
          company has revolutionized the space industry with reusable rockets and historic missions to the ISS and
          beyond.
        </motion.p>

        {/* Info cards - After Mars landing */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            { label: "Founded", value: "2002" },
            { label: "Headquarters", value: "Hawthorne, CA" },
            { label: "Founder", value: "Elon Musk" },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              className="px-6 py-3 bg-card/80 border border-border/50 rounded-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              whileHover={{ scale: 1.03, borderColor: "rgba(100, 200, 255, 0.4)" }}
            >
              <span className="text-muted-foreground text-xs uppercase tracking-wider">{item.label}</span>
              <p className="text-foreground font-semibold text-lg">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 3 ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="flex flex-col items-center gap-2 text-muted-foreground/60"
        >
          <span className="text-[10px] uppercase tracking-[0.15em]">Navigate with arrows</span>
          <div className="flex gap-2">
            <kbd className="px-2 py-0.5 bg-card/50 border border-border/50 rounded text-[10px]">↑</kbd>
            <kbd className="px-2 py-0.5 bg-card/50 border border-border/50 rounded text-[10px]">↓</kbd>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
