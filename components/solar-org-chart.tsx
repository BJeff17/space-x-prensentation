"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Users, Minimize2, Maximize2, ArrowUp } from "lucide-react"

interface OrgMember {
  name: string
  role: string
  level: number
  reports?: number
  reportsTo?: string
}

const ceo: OrgMember = {
  name: "Elon Musk",
  role: "Founder, CEO & CTO",
  level: 0,
  reports: 301,
}

const executives: OrgMember[] = [
  { name: "Gwynne Shotwell", role: "President & COO", level: 1, reports: 70, reportsTo: "Elon Musk" },
  { name: "Bret Johnsen", role: "CFO & President, Strategic Acquisitions", level: 1, reports: 28, reportsTo: "Elon Musk" },
  { name: "Mark Juncosa", role: "VP, Vehicle Engineering", level: 1, reports: 52, reportsTo: "Elon Musk" },
  { name: "Charles Kuehmann", role: "VP, Materials Engineering", level: 1, reports: 35, reportsTo: "Elon Musk" },
]

const engineers: OrgMember[] = [
  { name: "Joe Petrzelka", role: "VP, Spacecraft Engineering", level: 2, reports: 60, reportsTo: "Gwynne Shotwell" },
  { name: "Jonathan Greenhill", role: "Chief Government Officer", level: 2, reportsTo: "Gwynne Shotwell" },
  { name: "Jason Fritch", role: "VP, WW Enterprise Sales", level: 2, reports: 2, reportsTo: "Bret Johnsen" },
  { name: "Jessica Jensen", role: "VP, Customer Operations", level: 2, reports: 10, reportsTo: "Gwynne Shotwell" },
  { name: "Alexander Wojcicki", role: "Principal Propulsion Engineer", level: 2, reports: 11, reportsTo: "Mark Juncosa" },
  { name: "Craig Remillard", role: "Principal Engineer", level: 2, reports: 14, reportsTo: "Mark Juncosa" },
  { name: "Ali Sajjadi", role: "Principal RF Engineer", level: 2, reportsTo: "Charles Kuehmann" },
  { name: "Anthony Geoffron", role: "Principal System Engineer", level: 2, reportsTo: "Charles Kuehmann" },
  { name: "Andy Borrell", role: "Senior Software Engineer", level: 2, reportsTo: "Mark Juncosa" },
  { name: "Michael Zou", role: "Senior Software Engineer", level: 2, reportsTo: "Mark Juncosa" },
]

// Group engineers by their manager
const engineersByManager = engineers.reduce((acc, eng) => {
  const manager = eng.reportsTo || "Unknown"
  if (!acc[manager]) acc[manager] = []
  acc[manager].push(eng)
  return acc
}, {} as Record<string, OrgMember[]>)

// Enhanced detailed rocket with particle effects
function DetailedRocket({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 60 90" fill="none">
      <path
        d="M30 0C30 0 10 20 10 45C10 62 18 72 18 72H42C42 72 50 62 50 45C50 20 30 0 30 0Z"
        fill="url(#detailedBody)"
        stroke="#94a3b8"
        strokeWidth="1"
      />
      <ellipse cx="30" cy="32" rx="9" ry="11" fill="#0c1929" stroke="#38bdf8" strokeWidth="2" />
      <ellipse cx="30" cy="30" rx="5" ry="6" fill="#0ea5e9" opacity="0.4" />
      <ellipse cx="28" cy="28" rx="2" ry="2" fill="#bae6fd" opacity="0.8" />
      <path d="M10 45L-3 70L10 62V45Z" fill="#b91c1c" />
      <path d="M50 45L63 70L50 62V45Z" fill="#b91c1c" />
      <path d="M24 68H36V82H24V68Z" fill="#6b7280" />
      <path d="M27 68H33V82H27V68Z" fill="#9ca3af" />
      <motion.g
        animate={{ scaleY: [1, 1.4, 1], opacity: [1, 0.85, 1] }}
        transition={{ duration: 0.1, repeat: Number.POSITIVE_INFINITY }}
      >
        <ellipse cx="30" cy="88" rx="12" ry="14" fill="#ea580c" />
        <ellipse cx="30" cy="85" rx="9" ry="10" fill="#f97316" />
        <ellipse cx="30" cy="82" rx="6" ry="7" fill="#fbbf24" />
        <ellipse cx="30" cy="80" rx="3" ry="4" fill="#fef3c7" />
      </motion.g>
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={i}
          cx={25 + i * 2}
          cy={90}
          r={1}
          fill="#fbbf24"
          animate={{
            y: [0, 20 + Math.random() * 15],
            x: [(i - 2.5) * 3, (i - 2.5) * 8],
            opacity: [1, 0],
          }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.08 }}
        />
      ))}
      <defs>
        <linearGradient id="detailedBody" x1="30" y1="0" x2="30" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#f1f5f9" />
          <stop offset="1" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Impressive smoke/landing effect
function LandingEffect({ isActive }: { isActive: boolean }) {
  if (!isActive) return null

  return (
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(148,163,184,${0.6 - i * 0.04}) 0%, transparent 70%)`,
            width: 20 + i * 4,
            height: 20 + i * 4,
          }}
          initial={{ y: 0, x: 0, scale: 0.2, opacity: 0.9 }}
          animate={{
            y: [0, 50 + i * 8, 100 + i * 12],
            x: [
              (i % 2 === 0 ? 1 : -1) * (i * 8),
              (i % 2 === 0 ? 1 : -1) * (20 + i * 12),
              (i % 2 === 0 ? 1 : -1) * (40 + i * 15),
            ],
            scale: [0.2, 1.2, 2],
            opacity: [0.9, 0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
      <motion.div
        className="absolute w-32 h-8 rounded-full bg-orange-500/30 blur-xl"
        style={{ bottom: -10, left: -64 }}
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.2, 1] }}
        transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
      />
    </div>
  )
}

function CompactOrgCard({ member, delay, isCollapsed }: { member: OrgMember; delay: number; isCollapsed: boolean }) {
  const [phase, setPhase] = useState<"flying" | "landing" | "landed">("flying")
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) {
      setPhase("landed")
      return
    }
    const landingTimer = setTimeout(() => setPhase("landing"), delay * 1000 + 800)
    const landedTimer = setTimeout(
      () => {
        setPhase("landed")
        setHasAnimated(true)
      },
      delay * 1000 + 1500,
    )
    return () => {
      clearTimeout(landingTimer)
      clearTimeout(landedTimer)
    }
  }, [delay, hasAnimated])

  const levelStyles = {
    0: { border: "border-accent", bg: "from-accent", color: "accent" },
    1: { border: "border-primary", bg: "from-primary", color: "primary" },
    2: { border: "border-emerald-500", bg: "from-emerald-500", color: "emerald-500" },
  }

  const style = levelStyles[member.level as keyof typeof levelStyles]

  // Collapsed compact view
  if (isCollapsed) {
    return (
      <motion.div
        layout
        className={`relative flex items-center gap-2 px-3 py-2 bg-card/95 border ${style.border} rounded-lg backdrop-blur-sm`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${style.bg} to-slate-700 flex items-center justify-center`}
        >
          <span className="text-foreground font-bold text-xs">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="text-left">
          <p className="text-xs font-semibold text-foreground truncate max-w-[120px]">{member.name}</p>
          <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">{member.role.split(",")[0]}</p>
          {member.reportsTo && (
            <p className="text-[9px] text-primary/70 truncate max-w-[120px] flex items-center gap-0.5">
              <ArrowUp className="w-2 h-2" />
              {member.reportsTo}
            </p>
          )}
        </div>
      </motion.div>
    )
  }

  // Full expanded view with rocket animation
  const sizeClass = member.level === 0 ? "w-72" : member.level === 1 ? "w-56" : "w-48"

  return (
    <div className={`relative ${sizeClass}`}>
      {/* Flying rocket */}
      {phase === "flying" && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-30"
          initial={{ y: -300, opacity: 0, rotate: 0 }}
          animate={{ y: -30, opacity: 1, rotate: [0, 2, -2, 0] }}
          transition={{
            y: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] },
            opacity: { duration: 0.3, delay },
            rotate: { duration: 0.5, delay: delay + 0.3, repeat: 2 },
          }}
        >
          <DetailedRocket size={member.level === 0 ? 55 : member.level === 1 ? 45 : 35} />
        </motion.div>
      )}

      {/* Landing rocket with effects */}
      {phase === "landing" && (
        <>
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 z-30"
            initial={{ y: -30 }}
            animate={{ y: -15, scale: [1, 0.95, 1] }}
            transition={{ duration: 0.4 }}
          >
            <DetailedRocket size={member.level === 0 ? 55 : member.level === 1 ? 45 : 35} />
          </motion.div>
          <LandingEffect isActive={true} />
        </>
      )}

      {/* Landed mini rocket */}
      {phase === "landed" && (
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2 z-20"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0.4, opacity: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="30" height="40" viewBox="0 0 60 90" fill="none">
            <path d="M30 0C30 0 10 20 10 45C10 62 18 72 18 72H42C42 72 50 62 50 45C50 20 30 0 30 0Z" fill="#e2e8f0" />
            <ellipse cx="30" cy="32" rx="9" ry="11" fill="#0c1929" />
            <path d="M10 45L-3 70L10 62V45Z" fill="#b91c1c" />
            <path d="M50 45L63 70L50 62V45Z" fill="#b91c1c" />
          </svg>
        </motion.div>
      )}

      {/* Card */}
      <motion.div
        className={`relative bg-card/95 border-2 ${style.border} rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm`}
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={phase === "landed" ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 40 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className={`h-1.5 bg-gradient-to-r ${style.bg} to-transparent`} />

        <div className="p-4 text-center">
          <motion.div
            className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-br ${style.bg} to-slate-700 flex items-center justify-center mb-2 shadow-lg ring-2 ring-offset-2 ring-offset-card ring-${style.color}`}
            initial={{ scale: 0 }}
            animate={phase === "landed" ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="text-foreground font-bold text-xs drop-shadow">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </motion.div>

          <motion.h3
            className="font-bold text-foreground text-sm mb-0.5"
            initial={{ opacity: 0, y: 10 }}
            animate={phase === "landed" ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {member.name}
          </motion.h3>

          <motion.p
            className="text-xs text-muted-foreground leading-tight"
            initial={{ opacity: 0 }}
            animate={phase === "landed" ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {member.role}
          </motion.p>

          {member.reportsTo && (
            <motion.div
              className="flex items-center justify-center gap-1 mt-1.5 text-primary/80"
              initial={{ opacity: 0 }}
              animate={phase === "landed" ? { opacity: 1 } : {}}
              transition={{ delay: 0.45 }}
            >
              <ArrowUp className="w-3 h-3" />
              <span className="text-[10px] font-medium">Reports to {member.reportsTo}</span>
            </motion.div>
          )}

          {member.reports && (
            <motion.div
              className="flex items-center justify-center gap-1 mt-1 text-primary"
              initial={{ opacity: 0 }}
              animate={phase === "landed" ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <Users className="w-3 h-3" />
              <span className="text-xs font-medium">{member.reports} reports</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// Animated connection line
function ConnectionLine({ delay, height = 40, isCollapsed }: { delay: number; height?: number; isCollapsed: boolean }) {
  if (isCollapsed) return null
  return (
    <motion.div
      className="w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent mx-auto"
      style={{ height }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    />
  )
}

export default function SolarOrgChart() {
  const containerRef = useRef(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <section className="relative h-full py-4 px-2 sm:px-4 overflow-hidden flex flex-col" ref={containerRef}>
      {/* Ambient background rockets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{ left: `${5 + i * 12}%`, top: "100%" }}
            animate={{ y: "-250vh" }}
            transition={{ duration: 15 + i * 2, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: i * 3 }}
          >
            <svg width="20" height="35" viewBox="0 0 60 90" fill="none">
              <path d="M30 0C30 0 10 20 10 45C10 62 18 72 18 72H42C42 72 50 62 50 45C50 20 30 0 30 0Z" fill="#60a5fa" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-none mx-auto relative z-10 flex-1 flex flex-col min-h-0">
        {/* Header with collapse button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 flex-shrink-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            SpaceX <span className="text-primary">Organization</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-3">
            Discover the hierarchical structure of SpaceX with clear reporting relationships
          </p>

          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-card/80 border border-border rounded-lg text-sm text-foreground hover:bg-card hover:border-primary transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isCollapsed ? (
              <>
                <Maximize2 className="w-4 h-4" />
                Expand View
              </>
            ) : (
              <>
                <Minimize2 className="w-4 h-4" />
                Compact View
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Org Chart */}
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col items-center justify-center gap-4 overflow-y-auto px-2"
            >
              {/* CEO */}
              <div>
                <CompactOrgCard member={ceo} delay={0} isCollapsed={true} />
              </div>

              {/* Executives row */}
              <div className="flex flex-wrap justify-center gap-2">
                {executives.map((exec) => (
                  <CompactOrgCard key={exec.name} member={exec} delay={0} isCollapsed={true} />
                ))}
              </div>

              {/* Engineers grouped by manager */}
              <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
                {executives.map((exec) => {
                  const teamMembers = engineersByManager[exec.name] || []
                  if (teamMembers.length === 0) return null
                  return (
                    <div key={exec.name} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-card/30 border border-border/30">
                      <span className="text-[10px] text-primary font-medium mb-1">Team {exec.name.split(" ")[1]}</span>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {teamMembers.map((eng) => (
                          <CompactOrgCard key={eng.name} member={eng} delay={0} isCollapsed={true} />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                {[
                  { label: "CEO & Founder", color: "bg-accent" },
                  { label: "Executive Leadership", color: "bg-primary" },
                  { label: "VPs & Senior Engineers", color: "bg-emerald-500" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex-1 overflow-y-auto pb-4 min-h-0"
            >
              <div className="flex flex-col items-center px-2">
                {/* CEO Level */}
                <CompactOrgCard member={ceo} delay={0.2} isCollapsed={false} />
                <ConnectionLine delay={1.8} height={30} isCollapsed={false} />

                {/* Executive Level with their teams */}
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-3" />
                  
                  {/* Grid of executives with their teams */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
                    {executives.map((exec, execIdx) => {
                      const teamMembers = engineersByManager[exec.name] || []
                      return (
                        <motion.div
                          key={exec.name}
                          className="flex flex-col items-center bg-card/20 rounded-xl p-3 border border-border/30"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.2 + execIdx * 0.2 }}
                        >
                          {/* Executive */}
                          <div className="flex flex-col items-center">
                            <div className="w-0.5 h-3 bg-primary/40" />
                            <CompactOrgCard member={exec} delay={2.2 + execIdx * 0.3} isCollapsed={false} />
                          </div>
                          
                          {/* Team members under this executive */}
                          {teamMembers.length > 0 && (
                            <>
                              <motion.div
                                className="w-0.5 h-4 bg-emerald-500/40 mt-2"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 3 + execIdx * 0.3 }}
                              />
                              <motion.div
                                className="text-[10px] text-emerald-400/80 font-medium my-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3.1 + execIdx * 0.3 }}
                              >
                                Direct Reports
                              </motion.div>
                              <div className="flex flex-wrap justify-center gap-2">
                                {teamMembers.map((eng, engIdx) => (
                                  <div key={eng.name} className="flex flex-col items-center">
                                    <div className="w-0.5 h-2 bg-emerald-500/30" />
                                    <CompactOrgCard 
                                      member={eng} 
                                      delay={3.5 + execIdx * 0.3 + engIdx * 0.1} 
                                      isCollapsed={false} 
                                    />
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Legend */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 5 }}
                  className="flex flex-wrap justify-center gap-6 mt-6"
                >
                  {[
                    { label: "CEO & Founder", color: "bg-accent" },
                    { label: "Executive Leadership", color: "bg-primary" },
                    { label: "VPs & Senior Engineers", color: "bg-emerald-500" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
