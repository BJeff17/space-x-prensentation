"use client"

import { motion } from "framer-motion"

export default function FooterCredits() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 8 }}
      className="w-full border-t border-border/30 bg-card/30 backdrop-blur-sm mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center text-muted-foreground">
          <p className="text-sm mb-1">
            Created by <span className="text-foreground font-medium">BJeff17</span> | December 6, 2025
          </p>
          <p className="text-xs">
            Oral presentation on SpaceX's organizational structure
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
