"use client"

import { motion } from "framer-motion"

export default function Credits() {
  return (
    <section className="relative h-full flex items-center justify-center px-4 py-12">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.05 + Math.random() * 0.15,
            }}
            animate={{ opacity: [0.05, 0.2, 0.05] }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Title */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            About This <span className="text-primary">Presentation</span>
          </motion.h2>

          {/* Content Grid */}
          <div className="grid gap-6 md:gap-8">
            {/* Author */}
            <motion.div
              className="bg-card/60 border border-border/50 rounded-lg p-6 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ borderColor: "rgba(100, 200, 255, 0.4)", scale: 1.01 }}
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Author</p>
              <p className="text-xl font-semibold text-foreground">BJeff17</p>
            </motion.div>

            {/* Teacher */}
            <motion.div
              className="bg-card/60 border border-border/50 rounded-lg p-6 backdrop-blur-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ borderColor: "rgba(100, 200, 255, 0.4)", scale: 1.01 }}
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Teacher</p>
              <p className="text-xl font-semibold text-foreground">Mrs. PORET GILBERT</p>
              <p className="text-sm text-muted-foreground mt-1">English Teacher</p>
            </motion.div>

            {/* Dates */}
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="bg-card/60 border border-border/50 rounded-lg p-6 backdrop-blur-sm hover:border-primary/40 transition-colors">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Created</p>
                <p className="text-lg font-semibold text-foreground">December 6, 2025</p>
              </div>
              <div className="bg-card/60 border border-border/50 rounded-lg p-6 backdrop-blur-sm hover:border-primary/40 transition-colors">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Evaluation</p>
                <p className="text-lg font-semibold text-foreground">December 12, 2025</p>
              </div>
            </motion.div>

            {/* Purpose */}
            <motion.div
              className="bg-card/60 border border-border/50 rounded-lg p-6 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ borderColor: "rgba(100, 200, 255, 0.4)", scale: 1.01 }}
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Purpose</p>
              <p className="text-base text-foreground leading-relaxed">
                Oral presentation exploring SpaceX's corporate organizational chart
              </p>
            </motion.div>
          </div>

          {/* Footer note */}
          <motion.div
            className="mt-12 pt-8 border-t border-border/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xs text-muted-foreground/60 uppercase tracking-widest">
              Built with Next.js & Tailwind CSS
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
