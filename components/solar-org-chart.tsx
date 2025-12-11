"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Users, Minimize2, Maximize2, ChevronDown, ChevronRight } from "lucide-react"
import { clsx } from "clsx"

interface OrgMember {
  id: string
  name: string
  role: string
  level: number
  reportsTo?: string
  reports?: number
  department?: string
  icon?: string
}

// Hierarchical data structure based on The Official Board
const orgData: OrgMember[] = [
  // Level 0 - CEO
  { id: "elon", name: "Elon Musk", role: "CEO, CTO & Chief Designer", level: 0, reports: 301, department: "executive", icon: "🚀" },
  
  // Level 1 - Direct reports to CEO
  { id: "gwynne", name: "Gwynne Shotwell", role: "President & COO", level: 1, reportsTo: "elon", reports: 70, department: "operations", icon: "⚙️" },
  { id: "bret", name: "Bret Johnsen", role: "CFO & Strategic Acquisitions", level: 1, reportsTo: "elon", reports: 28, department: "finance", icon: "💰" },
  { id: "mark", name: "Mark Juncosa", role: "VP, Vehicle Engineering", level: 1, reportsTo: "elon", reports: 52, department: "engineering", icon: "🔧" },
  { id: "charles", name: "Charles Kuehmann", role: "VP, Materials Engineering", level: 1, reportsTo: "elon", reports: 35, department: "engineering", icon: "🔬" },
  { id: "phil", name: "Phil Alden", role: "VP, Starship Production", level: 1, reportsTo: "elon", department: "production", icon: "🏭" },
  { id: "stuart", name: "Stuart Keech", role: "VP, Starship Engineering", level: 1, reportsTo: "elon", department: "engineering", icon: "🛸" },
  { id: "joe", name: "Joe Petrzelka", role: "VP, Spacecraft Engineering", level: 1, reportsTo: "elon", reports: 60, department: "engineering", icon: "🛰️" },
  { id: "david", name: "David Harris", role: "Acting General Counsel", level: 1, reportsTo: "elon", department: "legal", icon: "⚖️" },
  
  // Level 2 - Reports to Gwynne Shotwell
  { id: "jessica", name: "Jessica Jensen", role: "VP, Customer Operations & Integration", level: 2, reportsTo: "gwynne", reports: 10, department: "operations", icon: "👥" },
  { id: "brian", name: "Brian Bjelde", role: "VP, People Operations / HR", level: 2, reportsTo: "gwynne", department: "operations", icon: "👔" },
  { id: "lee", name: "Lee Rosen", role: "VP, Mission & Launch Operations", level: 2, reportsTo: "gwynne", department: "operations", icon: "🚀" },
  { id: "jon", name: "Jon Edwards", role: "VP, Falcon Launch Vehicles", level: 2, reportsTo: "gwynne", department: "operations", icon: "🎯" },
]

// Department color mappings
const departmentColors = {
  executive: { bg: "from-orange-500", border: "border-orange-500", text: "text-orange-500" },
  operations: { bg: "from-blue-500", border: "border-blue-500", text: "text-blue-500" },
  finance: { bg: "from-green-500", border: "border-green-500", text: "text-green-500" },
  engineering: { bg: "from-purple-500", border: "border-purple-500", text: "text-purple-500" },
  production: { bg: "from-cyan-500", border: "border-cyan-500", text: "text-cyan-500" },
  legal: { bg: "from-amber-500", border: "border-amber-500", text: "text-amber-500" },
}

// Helper function to get children of a member
function getChildren(parentId: string): OrgMember[] {
  return orgData.filter(member => member.reportsTo === parentId)
}

// Helper function to get display icon or initials
function getDisplayIcon(member: OrgMember): string {
  return member.icon || member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
}

// Legend items for department categories
const DEPARTMENT_LEGEND = [
  { label: "Executive", color: "bg-orange-500", icon: "🚀" },
  { label: "Operations", color: "bg-blue-500", icon: "⚙️" },
  { label: "Finance", color: "bg-green-500", icon: "💰" },
  { label: "Engineering", color: "bg-purple-500", icon: "🔧" },
  { label: "Legal", color: "bg-amber-500", icon: "⚖️" },
]

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
  const [isExpanded, setIsExpanded] = useState(true)
  const children = getChildren(member.id)
  const hasChildren = children.length > 0

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

  const departmentStyle = departmentColors[member.department as keyof typeof departmentColors] || departmentColors.engineering

  // Collapsed compact view
  if (isCollapsed) {
    return (
      <motion.div
        layout
        className={`relative flex items-center gap-2 px-3 py-2 bg-card/95 border ${departmentStyle.border} rounded-lg backdrop-blur-sm`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${departmentStyle.bg} to-slate-700 flex items-center justify-center`}
        >
          <span className="text-foreground font-bold text-xs">
            {getDisplayIcon(member)}
          </span>
        </div>
        <div className="text-left">
          <p className="text-xs font-semibold text-foreground truncate max-w-[120px]">{member.name}</p>
          <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">{member.role.split(",")[0]}</p>
        </div>
        {hasChildren && (
          <div className="ml-auto bg-primary/20 px-1.5 py-0.5 rounded text-[9px] font-medium text-primary">
            {children.length}
          </div>
        )}
      </motion.div>
    )
  }

  // Full expanded view with rocket animation and hierarchy
  const sizeClass = member.level === 0 ? "w-80" : member.level === 1 ? "w-64" : "w-56"

  return (
    <div className="flex flex-col items-center">
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

        {/* Card with expand/collapse */}
        <motion.div
          className={`relative bg-card/95 border-2 ${departmentStyle.border} rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm hover:shadow-3xl transition-shadow cursor-pointer`}
          initial={{ opacity: 0, scale: 0.7, y: 40 }}
          animate={phase === "landed" ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 40 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
        >
          <div className={`h-1.5 bg-gradient-to-r ${departmentStyle.bg} to-transparent`} />

          <div className="p-5 text-center">
            <motion.div
              className={clsx(
                "w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 shadow-lg",
                "ring-2 ring-offset-2 ring-offset-card",
                `bg-gradient-to-br ${departmentStyle.bg} to-slate-700`,
                departmentStyle.border
              )}
              initial={{ scale: 0 }}
              animate={phase === "landed" ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <span className="text-2xl">
                {getDisplayIcon(member)}
              </span>
            </motion.div>

            <motion.h3
              className="font-bold text-foreground text-sm mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={phase === "landed" ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {member.name}
            </motion.h3>

            <motion.p
              className="text-xs text-muted-foreground leading-tight mb-2"
              initial={{ opacity: 0 }}
              animate={phase === "landed" ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {member.role}
            </motion.p>

            <div className="flex items-center justify-center gap-3 mt-2">
              {member.reports && (
                <motion.div
                  className={`flex items-center gap-1 ${departmentStyle.text}`}
                  initial={{ opacity: 0 }}
                  animate={phase === "landed" ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <Users className="w-3 h-3" />
                  <span className="text-xs font-medium">{member.reports}</span>
                </motion.div>
              )}
              
              {hasChildren && (
                <motion.div
                  className={`flex items-center gap-1 ${departmentStyle.text}`}
                  initial={{ opacity: 0 }}
                  animate={phase === "landed" ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span className="text-xs font-medium">{children.length}</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Children with connection lines */}
      {hasChildren && isExpanded && phase === "landed" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 w-full"
        >
          {/* Vertical line down */}
          <div className={`w-0.5 h-8 ${departmentStyle.bg} bg-gradient-to-b mx-auto`} />
          
          {/* Horizontal connecting line */}
          <div className={`relative h-0.5 ${departmentStyle.bg} bg-gradient-to-r w-full max-w-4xl mx-auto`}>
            {/* Vertical drops to each child */}
            <div className="absolute inset-0 flex justify-around">
              {children.map((_, idx) => (
                <div key={idx} className={`w-0.5 h-4 ${departmentStyle.bg} bg-gradient-to-b`} />
              ))}
            </div>
          </div>

          {/* Children cards */}
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {children.map((child, idx) => (
              <CompactOrgCard 
                key={child.id} 
                member={child} 
                delay={delay + 0.8 + idx * 0.2} 
                isCollapsed={false}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default function SolarOrgChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const ceo = orgData.find(m => m.level === 0)!

  return (
    <section className="relative h-full py-8 px-4 overflow-hidden" ref={containerRef}>
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

      <div className={`max-w-7xl mx-auto relative z-10 h-full flex flex-col ${isCollapsed ? "" : "overflow-y-auto"}`} id="org-chart-container">
        {/* Header with collapse button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 flex-shrink-0"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
            SpaceX <span className="text-primary">Organization</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Hierarchical structure showing clear reporting relationships
          </p>

          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 border border-border rounded-lg text-sm text-foreground hover:bg-card hover:border-primary transition-colors"
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
              className="flex-1 flex flex-col items-center justify-center gap-6 overflow-y-auto"
            >
              {/* CEO */}
              <div>
                <CompactOrgCard member={ceo} delay={0} isCollapsed={true} />
              </div>

              {/* All level 1 members */}
              <div className="flex flex-wrap justify-center gap-3 max-w-5xl">
                {orgData.filter(m => m.level === 1).map((exec) => (
                  <CompactOrgCard key={exec.id} member={exec} delay={0} isCollapsed={true} />
                ))}
              </div>

              {/* All level 2 members */}
              <div className="flex flex-wrap justify-center gap-2 max-w-5xl">
                {orgData.filter(m => m.level === 2).map((member) => (
                  <CompactOrgCard key={member.id} member={member} delay={0} isCollapsed={true} />
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-6 mt-4">
                {DEPARTMENT_LEGEND.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-xs">{item.icon}</span>
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
              className="flex-1 overflow-y-auto pb-8"
            >
              <div className="flex flex-col items-center">
                {/* CEO Level with full hierarchy */}
                <CompactOrgCard member={ceo} delay={0.2} isCollapsed={false} />

                {/* Legend */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 5 }}
                  className="flex flex-wrap justify-center gap-6 mt-16"
                >
                  {DEPARTMENT_LEGEND.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${item.color}`} />
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-muted-foreground">{item.label}</span>
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
