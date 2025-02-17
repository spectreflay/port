"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import type { PageInfo } from "../typings"
import { urlFor } from "../sanity"
import { GraduationCap, Briefcase, Code, Palette, ChevronRight } from "lucide-react"

type Props = {
  pageInfo: PageInfo
}

export default function About({ pageInfo }: Props) {
  const [activeSection, setActiveSection] = useState("Background")
  const [isHovered, setIsHovered] = useState(false)

  const sections = [
    {
      title: "Background",
      icon: GraduationCap,
      content: pageInfo?.backgroundInformation,
    },
    {
      title: "Experience",
      icon: Briefcase,
      content: "Pushing the boundaries of digital innovation with years of hands-on experience in web development.",
    },
    {
      title: "Technical",
      icon: Code,
      content:
        "Expertise in modern web technologies and frameworks, focusing on creating efficient and scalable solutions.",
    },
    {
      title: "Creative",
      icon: Palette,
      content:
        "Combining technical skills with creative design thinking to build unique and engaging user experiences.",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative min-h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="shape-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 232, 203, 0.1)" />
              <stop offset="100%" stopColor="rgba(126, 162, 170, 0.1)" />
            </linearGradient>
          </defs>

          {/* Top-left shape */}
          <motion.path
            d="M0,0 Q20,0 20,20 Q0,20 0,0 Z"
            fill="url(#shape-gradient)"
            animate={{
              d: ["M0,0 Q20,0 20,20 Q0,20 0,0 Z", "M0,0 Q25,5 20,25 Q-5,20 0,0 Z", "M0,0 Q20,0 20,20 Q0,20 0,0 Z"],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 10, ease: "easeInOut" }}
          />

          {/* Bottom-right shape */}
          <motion.path
            d="M100,100 Q80,100 80,80 Q100,80 100,100 Z"
            fill="url(#shape-gradient)"
            animate={{
              d: [
                "M100,100 Q80,100 80,80 Q100,80 100,100 Z",
                "M100,100 Q75,95 80,75 Q105,80 100,100 Z",
                "M100,100 Q80,100 80,80 Q100,80 100,100 Z",
              ],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 12, ease: "easeInOut" }}
          />

          {/* Middle shape */}
          <motion.circle
            cx="50"
            cy="50"
            r="10"
            fill="url(#shape-gradient)"
            animate={{
              r: [10, 15, 10],
              cx: [50, 52, 50],
              cy: [50, 48, 50],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 8, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <h3 className="absolute top-36 uppercase tracking-[20px] text-primary-mint text-2xl font-bold">About</h3>

      <div className="flex flex-col md:flex-row items-center gap-10 mt-20 md:mt-0">
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="flex-shrink-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="hexagon-container">
            <motion.div
              className="hexagon-inner"
              animate={{ rotateY: isHovered ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="hexagon-front">
                <img
                  src={urlFor(pageInfo?.profilePic).url() || "/placeholder.svg"}
                  alt={pageInfo?.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="hexagon-back">
                <div className="flex flex-col items-center justify-center h-full text-primary-mint p-4">
                  <h4 className="text-xl font-bold mb-2">{pageInfo?.name}</h4>
                  <p className="text-sm text-center">{pageInfo?.role}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-2xl"
        >
          <h4 className="text-3xl md:text-4xl font-bold text-primary-mint">
            Here's a <span className="underline decoration-primary-blue/50">little</span> about me
          </h4>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {sections.map((section) => (
              <motion.button
                key={section.title}
                onClick={() => setActiveSection(section.title)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm ${
                  activeSection === section.title
                    ? "bg-primary-mint text-primary-dark"
                    : "bg-primary-dark/40 text-primary-mint"
                } hover:bg-primary-mint hover:text-primary-dark transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <section.icon className="w-4 h-4" />
                <span>{section.title}</span>
              </motion.button>
            ))}
          </div>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-base md:text-lg text-primary-mint/80 glass-card p-6 rounded-lg min-h-[150px] relative overflow-hidden"
          >
            {sections.find((s) => s.title === activeSection)?.content}
            <motion.div
              className="absolute bottom-2 right-2 bg-primary-mint/20 rounded-full p-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <ChevronRight className="w-4 h-4 text-primary-mint" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

