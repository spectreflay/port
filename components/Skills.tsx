import { motion } from "framer-motion"
import { useState } from "react"
import Skill from "./Skill"
import type { Skill as SkillType } from "../typings"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
  skills: SkillType[]
}

function Skills({ skills }: Props) {
  const ITEMS_PER_PAGE = 12
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(skills.length / ITEMS_PER_PAGE)

  const getCurrentPageSkills = () => {
    const start = currentPage * ITEMS_PER_PAGE
    return skills.slice(start, start + ITEMS_PER_PAGE)
  }

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const pageIndicators = Array.from({ length: totalPages }, (_, i) => i)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen flex relative flex-col text-center md:text-left max-w-[2000px] xl:px-10 min-h-screen justify-center mx-auto items-center"
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="skills-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 232, 203, 0.1)" />
              <stop offset="100%" stopColor="rgba(126, 162, 170, 0.1)" />
            </linearGradient>
          </defs>

          <motion.path
            d="M100,0 Q80,0 80,20 Q100,20 100,0 Z"
            fill="url(#skills-gradient)"
            animate={{
              d: [
                "M100,0 Q80,0 80,20 Q100,20 100,0 Z",
                "M100,0 Q75,5 80,25 Q105,20 100,0 Z",
                "M100,0 Q80,0 80,20 Q100,20 100,0 Z",
              ],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 10, ease: "easeInOut" }}
          />

          <motion.path
            d="M0,100 Q20,100 20,80 Q0,80 0,100 Z"
            fill="url(#skills-gradient)"
            animate={{
              d: [
                "M0,100 Q20,100 20,80 Q0,80 0,100 Z",
                "M0,100 Q25,95 20,75 Q-5,80 0,100 Z",
                "M0,100 Q20,100 20,80 Q0,80 0,100 Z",
              ],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 12, ease: "easeInOut" }}
          />

          <motion.circle
            cx="50"
            cy="50"
            r="8"
            fill="url(#skills-gradient)"
            animate={{
              r: [8, 12, 8],
              cx: [50, 48, 50],
              cy: [50, 52, 50],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 8, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <h3 className="absolute top-36 uppercase tracking-[20px] text-primary-mint text-2xl font-bold">Tech Stack</h3>
      {/* <h3 className="absolute top-36 uppercase tracking-[3px] text-primary-mint/70 text-sm">
        Hover over a skill for current proficiency
      </h3> */}

      <div className="w-full max-w-6xl px-20 mt-32 relative">
        {/* Skills Grid with Hexagonal Layout */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 relative"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {getCurrentPageSkills().map((skill, index) => (
            <motion.div
              key={skill._id}
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 100 },
                },
              }}
              className={`transform mx-auto ${index % 2 === 0 ? "translate-y-2" : ""}`}
            >
              <Skill skill={skill} directionLeft={index < ITEMS_PER_PAGE / 2} />
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Controls */}
        {totalPages > 1 && (
          <div className="absolute -bottom-20 left-0 right-0 flex justify-center items-center gap-4">
            <button
              onClick={prevPage}
              className="p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 backdrop-blur-sm transition-all duration-300 hover:bg-primary-mint hover:text-primary-dark group"
            >
              <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
            </button>

            {/* Page Indicators */}
            <div className="flex gap-2">
              {pageIndicators.map((pageIndex) => (
                <button
                  key={pageIndex}
                  onClick={() => setCurrentPage(pageIndex)}
                  className={`h-2 transition-all duration-300 rounded-full ${
                    currentPage === pageIndex ? "w-6 bg-primary-mint" : "w-2 bg-primary-mint/30 hover:bg-primary-mint/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              className="p-3 rounded-full bg-primary-dark/80 text-primary-mint border border-primary-mint/20 backdrop-blur-sm transition-all duration-300 hover:bg-primary-mint hover:text-primary-dark group"
            >
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Skills