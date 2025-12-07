"use client"

import { motion } from "framer-motion"

export default function CreditsSection() {
  return (
    <section className="relative h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-slate-900/20">
      {/* Subtle star background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1 + Math.random() * 0.3,
            }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl px-8"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-8 text-foreground"
        >
          About This Presentation
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8"
        />

        {/* Information Cards */}
        <div className="space-y-4">
          {[
            { label: "Author", value: "BJeff17" },
            { label: "Teacher", value: "Mrs. PORET GILBERT" },
            { label: "Date", value: "December 6, 2025" },
            { label: "Purpose", value: "Oral presentation exploring SpaceX's corporate organizational chart" },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-4 px-6 py-3 bg-card/60 border border-border/30 rounded-lg backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 transition-all duration-300"
            >
              <span className="text-muted-foreground text-sm uppercase tracking-wider font-medium md:min-w-[120px] md:text-right">
                {item.label}
              </span>
              <span className="hidden md:block text-border">•</span>
              <p className="text-foreground font-medium text-base">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 text-muted-foreground/60 text-xs uppercase tracking-widest"
        >
          SpaceX Organizational Chart Presentation
        </motion.div>
      </motion.div>
    </section>
  )
}
